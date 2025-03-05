/** @format */

import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import Form from './Form'
import { useDispatch, useStore } from './store'
import {Close} from './Icons'

export default function Modal({ className = '', style = {}, product }) {
	const dispatch = useDispatch()
	const store = useStore()
	const close = useCallback(() => {
		dispatch({ type: 'CLOSE_MODAL' })
	}, [dispatch])

	if (!store.isModalOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div
			className={`fixed flex inset-0 z-50 justify-center items-center`}
			style={{ background: 'rgba(0,0,0,0.64)' }}
		>
			<div
				className={`w-[600px] rounded-2xl relative p-8 modal-box max-w-max bg-white px-4 text-black-96 xl:px-6 ${className}`}
				style={style}
			>
				<Form product={product} />
				<span
					className='absolute right-1 top-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black-12'
					onClick={close}
				>
					<Close />
				</span>
			</div>
		</div>,
		document.body
	)
}