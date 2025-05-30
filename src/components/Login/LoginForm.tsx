/** @format */

import { useEffect, useState } from 'react'
import qs from 'qs'
import { get, post } from '@utils/request'
import cookie from '@utils/cookie'
import VerificationCode from './VerificationCode'
import { signIn } from '@utils/firebase'
import { Spin } from 'antd'

function normalizePubKey(data) {
	return `-----BEGIN PUBLIC KEY-----\n${data}\n-----END PUBLIC KEY-----`
}

// 注册
export async function register({ code, email, pwd }: { code: string; email: string; pwd: string }) {
	const [mod, json] = await Promise.all([import('@utils/crypto'), get('/users/me/key')])
	const { setPublicKey, rsaEncrypt, sha256 } = mod
	setPublicKey(normalizePubKey(json.data))
	const utm_source = cookie.get('utm_source') || ''
	const cp_id = cookie.get('cp_id') || ''
	const { data } = await post(`/register?${qs.stringify({ utm_source, cp_id })}`, {
		code,
		email,
		pwd: rsaEncrypt(sha256(pwd).toString()),
		utm: `utm_source=${utm_source}&cp_id=${cp_id}`,
	})
	cookie.set('access_token', (data as { token: string }).token, 31536000000)
	return data
}

async function login(email: string, password: string) {
	const [mod, json, ticketJson] = await Promise.all([
		import('@utils/crypto'),
		get('/users/me/key'),
		get('/users/me/ticket', { email }),
	])
	const { setPublicKey, rsaEncrypt, sha256 } = mod
	setPublicKey(normalizePubKey(json.data))
	const { data } = await post('/login', {
		email,
		pwd: rsaEncrypt(sha256(password) + ticketJson.data),
	})
	localStorage.setItem('fb_email', email)
	cookie.set('access_token', (data as { token: string }).token, 31536000000)
	return data
}

export default function LoginFrom({ type }) {
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [loading, setLoading] = useState(false) //加载
	const [authTips, setAuthTips] = useState('') // //账号,验证码或密码错误
	const [code, setCode] = useState('')
	const [authTipsType, setAuthTipsType] = useState('')
	const [isSubmit, setIsSubmit] = useState(false)

	// 提交表单
	const onSubmit = async e => {
		e.preventDefault()
		if (!isSubmit) return
		if (loading) {
			console.warn('Duplicate click event')
			return
		}
		try {
			setLoading(true)
			if (type === 'signup') {
				const data = await register({ code, email, pwd })
				localStorage.setItem('user', JSON.stringify(data))
			} else {
				const data = await login(email, pwd)
				localStorage.setItem('user', JSON.stringify(data))
			}
			// alert.success('login_success')
			window.location.href = '/'
		} catch (e) {
			if (e.code === 145) {
				setAuthTipsType('')
				setAuthTips('Email or password is incorrect.')
			} else if (e.code === 149) {
				setAuthTipsType('verification')
				setAuthTips('Verification code error')
			} else {
				alert(e.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const handleLogin = async e => {
		e.preventDefault()
		const data = await signIn()
		if (data) {
			localStorage.setItem('user', JSON.stringify(data))
			location.href = '/'
		}
	}

	// 及时清除错误信息
	useEffect(() => {
		setAuthTips(null)
	}, [email, pwd])

	// 是否能提交的校验
	useEffect(() => {
		const isOk = email && pwd
		setIsSubmit(!!isOk)
	}, [email, pwd])

	return (
		<form onSubmit={onSubmit} className='py-4'>
			<a
				href='/continue-with-google'
				onClick={handleLogin}
				className=' btn h-12 w-full cursor-pointer select-none rounded-full bg-blue-600 text-base text-white flex items-center justify-center'
			>
				Continue with Google
			</a>

			<div className='flex items-center justify-center my-6'>
				<div className='w-full h-[1px] bg-gray-300'></div>
				<span className='mx-4'>OR</span>
				<div className='w-full h-[1px] bg-gray-300'></div>
			</div>

			<div className={`relative mb-4`}>
				<input
					type='email'
					placeholder='Email'
					autoComplete='off'
					onChange={e => setEmail(e.target.value)}
					required
					value={email}
					disabled={loading}
					className={`h-12 w-full rounded-full bg-blue-100 px-4 text-base text-black outline-none placeholder:text-white-48 focus-visible:border ${
						loading ? ' pointer-events-none' : ''
					} ${authTips ? 'border-blue-600 outline outline-1 outline-[red]' : 'border-blue-600'}`}
				/>
				{authTipsType !== 'verification' && (
					<p className='mt-2 whitespace-nowrap text-xs text-[red]'>{authTips}</p>
				)}
			</div>
			{type === 'signup' && (
				<>
					<VerificationCode
						disabled={loading}
						email={email}
						authTips={authTips}
						setAuthTips={setAuthTips}
						authTipsType={authTipsType}
						setAuthTipsType={setAuthTipsType}
						handleChange={e => setCode(e.target.value)}
					/>
					{/* 错误提示语 */}
					{authTipsType === 'verification' && (
						<p className='mt-2 ml-4 mb-4 whitespace-nowrap text-xs text-error-red'>{authTips}</p>
					)}
				</>
			)}
			{/* password */}
			<PasswordInput
				authTips={authTips}
				disabled={loading}
				handleChange={e => setPwd(e.target.value)}
			/>
			{/* 错误提示语 */}
			{authTipsType !== 'verification' && authTips && (
				<span className='mt-2 whitespace-nowrap text-xs text-[red]'>
					Email or password is incorrect.
				</span>
			)}
			{/* 提交表单 */}
			<div className={`relative mt-6 gap-4 flex flex-col`}>
				<button
					type='submit'
					className={`btn h-12 w-full cursor-pointer select-none rounded-full bg-blue-400 text-base text-white ${
						isSubmit ? 'bg-blue-600 hover:opacity-64' : 'cursor-no-drop opacity-64'
					} ${loading ? 'pointer-events-none' : ''}`}
				>
					{loading ? (
						<>
							<Spin />
							loading...
						</>
					) : (
						'Go with Email'
					)}
				</button>
			</div>
		</form>
	)
}

function PasswordInput({ authTips, disabled, handleChange }) {
	const [isShow, setIsShow] = useState(false) //密码显示

	return (
		<div className='relative'>
			<input
				type={isShow ? 'text' : 'password'}
				placeholder='Password'
				onChange={handleChange}
				required
				disabled={disabled}
				className={`h-12 w-full rounded-full border-blue-600 bg-blue-100 pl-4 pr-11 text-base text-black outline-none placeholder:text-white-48 focus-visible:border ${
					disabled ? 'pointer-events-none' : ''
				} ${authTips?.text ? 'outline outline-1 outline-red' : 'border-blue-600'}`}
			/>
			<div onClick={() => setIsShow(!isShow)}>
				{isShow ? (
					<div className='absolute top-3 right-4 cursor-pointer'>
						<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M12 5a1 1 0 0 1 .997.925L13 6v2h2.584l1.709-1.707a1 1 0 0 1 1.473 1.35l-.059.064-.45.452a5.002 5.002 0 0 1-1.04 9.836L17 18H7a5 5 0 0 1-1.256-9.84l-.451-.453a1 1 0 0 1 1.35-1.473l.064.059L8.415 8H11V6a1 1 0 0 1 1-1zm5 5H7a3 3 0 0 0-.176 5.995L7 16h10a3 3 0 0 0 0-6zm-5 1a2 2 0 1 1 0 4 2 2 0 0 1 0-4z'
								fill='#000'
								fillRule='evenodd'
								opacity='.8'
							/>
						</svg>
					</div>
				) : (
					<div className='absolute top-3 right-4 cursor-pointer'>
						<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M3.486 8.626a17.532 17.532 0 0 0 17.028 0 1 1 0 1 1 .972 1.748 19.53 19.53 0 0 1-3.432 1.497l.84 1.682.033.071a1 1 0 0 1-1.821.823l-1-2-.022-.046c-1.018.217-2.05.353-3.084.406V15a1 1 0 0 1-1.997.075L11 15v-2.193a19.537 19.537 0 0 1-3.086-.407l-.02.047-1 2-.037.069a1 1 0 0 1-1.751-.963l.84-1.682a19.53 19.53 0 0 1-3.432-1.497 1 1 0 0 1 .972-1.748z'
								fill='#000'
								fill-rule='evenodd'
								opacity='.8'
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	)
}
