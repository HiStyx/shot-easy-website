import { icons } from 'lucide-react';
import { cn } from '../lib/utils';

export const Icon = ({ name, color, size, className, ...props }) => {
    const LucideIcon = icons[name];
    return <span role="img" aria-label={name} className={cn("anticon", className)} {...props}><LucideIcon color={color} size={size || '1em'} /></span>;
};

export const Icons = {
    macos: (props) => (
        <svg {...props} width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 24.75C9.17564 24.75 11.75 22.1756 11.75 19C11.75 15.8244 9.17564 13.25 6 13.25C2.82436 13.25 0.25 15.8244 0.25 19C0.25 22.1756 2.82436 24.75 6 24.75Z" fill="#FF5F57" stroke="black" strokeOpacity="0.2" strokeWidth="0.5"></path><path d="M26 24.75C29.1756 24.75 31.75 22.1756 31.75 19C31.75 15.8244 29.1756 13.25 26 13.25C22.8244 13.25 20.25 15.8244 20.25 19C20.25 22.1756 22.8244 24.75 26 24.75Z" fill="#FEBC2E" stroke="black" strokeOpacity="0.2" strokeWidth="0.5"></path><path d="M46 24.75C49.1756 24.75 51.75 22.1756 51.75 19C51.75 15.8244 49.1756 13.25 46 13.25C42.8244 13.25 40.25 15.8244 40.25 19C40.25 22.1756 42.8244 24.75 46 24.75Z" fill="#28C840" stroke="black" strokeOpacity="0.2" strokeWidth="0.5"></path></svg>
    ),
    windows: (props) => (
        <svg {...props} width="104" height="38" viewBox="0 0 104 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.498047 20C0.361328 20 0.244141 19.9512 0.146484 19.8535C0.0488281 19.7559 0 19.6387 0 19.502C0 19.3652 0.0488281 19.248 0.146484 19.1504C0.244141 19.0488 0.361328 18.998 0.498047 18.998H10.5C10.6367 18.998 10.7539 19.0488 10.8516 19.1504C10.9492 19.248 10.998 19.3652 10.998 19.502C10.998 19.6387 10.9492 19.7559 10.8516 19.8535C10.7539 19.9512 10.6367 20 10.5 20H0.498047Z" fill="currentColor"></path><path d="M48.502 24.998C48.2285 24.998 47.9766 24.9316 47.7461 24.7988C47.5195 24.6621 47.3379 24.4805 47.2012 24.2539C47.0684 24.0234 47.002 23.7715 47.002 23.498V16.502C47.002 16.2285 47.0684 15.9785 47.2012 15.752C47.3379 15.5215 47.5195 15.3398 47.7461 15.207C47.9766 15.0703 48.2285 15.002 48.502 15.002H55.498C55.7715 15.002 56.0215 15.0703 56.248 15.207C56.4785 15.3398 56.6602 15.5215 56.793 15.752C56.9297 15.9785 56.998 16.2285 56.998 16.502V23.498C56.998 23.7715 56.9297 24.0234 56.793 24.2539C56.6602 24.4805 56.4785 24.6621 56.248 24.7988C56.0215 24.9316 55.7715 24.998 55.498 24.998H48.502ZM55.498 24.002C55.6348 24.002 55.752 23.9531 55.8496 23.8555C55.9512 23.7539 56.002 23.6348 56.002 23.498V16.502C56.002 16.3652 55.9512 16.248 55.8496 16.1504C55.752 16.0488 55.6348 15.998 55.498 15.998H48.502C48.3652 15.998 48.2461 16.0488 48.1445 16.1504C48.0469 16.248 47.998 16.3652 47.998 16.502V23.498C47.998 23.6348 48.0469 23.7539 48.1445 23.8555C48.2461 23.9531 48.3652 24.002 48.502 24.002H55.498Z" fill="currentColor"></path><path d="M92.498 24.998C92.3613 24.998 92.2441 24.9492 92.1465 24.8516C92.0488 24.7461 92 24.6289 92 24.5C92 24.3633 92.0488 24.2461 92.1465 24.1484L96.793 19.502L92.1465 14.8555C92.0488 14.7578 92 14.6387 92 14.498C92 14.3926 92.0293 14.2988 92.0879 14.2168L92.1465 14.1465C92.2441 14.0488 92.3613 14 92.498 14C92.6035 14 92.6992 14.0293 92.7852 14.0879L92.8555 14.1465L97.502 18.793L102.148 14.1465C102.242 14.0488 102.359 14 102.5 14C102.641 14 102.758 14.0488 102.852 14.1465C102.953 14.2402 103.004 14.3574 103.004 14.498C103.004 14.6348 102.953 14.7539 102.852 14.8555L98.2051 19.502L102.852 24.1484C102.949 24.2422 102.998 24.3594 102.998 24.5C102.998 24.6016 102.969 24.6973 102.91 24.7871L102.852 24.8516C102.758 24.9492 102.641 24.998 102.5 24.998C102.398 24.998 102.303 24.9688 102.213 24.9102L102.148 24.8516L97.502 20.2051L92.8555 24.8516C92.7578 24.9492 92.6387 24.998 92.498 24.998Z" fill="currentColor"></path></svg>
    ),
    transparent: (props) => (
        <svg {...props} width="1em" height="1em" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H32V32H0V0Z" fill="white"></path><path d="M0 0H8V8H0V0Z" fill="#D9D9D9"></path><path d="M8 0H16V8H8V0Z" fill="white"></path><path d="M16 0H24V8H16V0Z" fill="#D9D9D9"></path><path d="M32 0H40V8H32V0Z" fill="#D9D9D9"></path><path d="M24 0H32V8H24V0Z" fill="white"></path><path d="M0 32H8V40H0V32Z" fill="#D9D9D9"></path><path d="M8 32H16V40H8V32Z" fill="white"></path><path d="M16 32H24V40H16V32Z" fill="#D9D9D9"></path><path d="M32 32H40V40H32V32Z" fill="#D9D9D9"></path><path d="M24 32H32V40H24V32Z" fill="white"></path><path d="M0 16H8V24H0V16Z" fill="#D9D9D9"></path><path d="M32 16H40V24H32V16Z" fill="#D9D9D9"></path><path d="M8 16H16V24H8V16Z" fill="white"></path><path d="M16 16H24V24H16V16Z" fill="#D9D9D9"></path><path d="M24 16H32V24H24V16Z" fill="white"></path><path d="M8 24H16V32H8V24Z" fill="#D9D9D9"></path><path d="M16 24H24V32H16V24Z" fill="white"></path><path d="M24 24H32V32H24V24Z" fill="#D9D9D9"></path><path d="M0 24H8V32H0V24Z" fill="white"></path><path d="M32 24H40V32H32V24Z" fill="white"></path><path d="M8 8H16V16H8V8Z" fill="#D9D9D9"></path><path d="M16 8H24V16H16V8Z" fill="white"></path><path d="M24 8H32V16H24V8Z" fill="#D9D9D9"></path><path d="M0 8H8V16H0V8Z" fill="white"></path><path d="M32 8H40V16H32V8Z" fill="white"></path></svg>
    ),
    x: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
    ),
    reddit: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>   <path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"></path>   <path d="M12 8l1 -5l6 1"></path>   <path d="M19 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>   <circle cx="9" cy="13" r=".5" fill="currentColor"></circle>   <circle cx="15" cy="13" r=".5" fill="currentColor"></circle>   <path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"></path> </svg>
    ),
    productHunt: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>   <path d="M10 16v-8h2.5a2.5 2.5 0 1 1 0 5h-2.5"></path>   <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> </svg>
    ),
    appStore: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>   <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>   <path d="M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488"></path>   <path d="M7 14h5m2.9 0h2.1"></path>   <path d="M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805"></path> </svg>
    ),
    xhs: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"><path d="M16.892 11.588l.001-.005v-.008c0-.005 0-.01.002-.013v-.638a.127.127 0 00-.094-.118.214.214 0 00-.069-.009h-.42c-.02 0-.03 0-.035.005-.005.005-.005.015-.005.036l.005.717v.033a.013.013 0 00.014.013h.569l.02-.004.006-.001a.014.014 0 00.004-.003.013.013 0 00.002-.005z" clipRule="evenodd" fillRule="evenodd"></path><path d="M7 7a5 5 0 000 10h10a5 5 0 000-10H7zm11.698 4.96c.072.1.12.215.139.336a1.2 1.2 0 01.015.22v1.139a.778.778 0 01-.558.755 1.179 1.179 0 01-.235.043c-.083.006-.294.006-.38.006h-.292a.025.025 0 01-.023-.015v-.006c-.055-.12-.322-.729-.323-.743 0-.015.003-.019.015-.019h.698c.126 0 .19-.062.19-.21v-.682a.264.264 0 00-.158-.235.367.367 0 00-.16-.034h-1.329c-.015 0-.019.008-.019.02v1.88c0 .025.002.037-.004.042-.005.005-.017.005-.042.005h-.822c-.025 0-.037 0-.042-.005-.006-.005-.005-.017-.005-.042V12.56c0-.025.001-.036-.004-.041-.005-.005-.016-.004-.04-.004h-.833c-.005 0-.01 0-.016-.002a.033.033 0 01-.02-.022.033.033 0 01-.001-.016v-.83s-.004-.048.034-.048h.85c.035 0 .035-.067.035-.067v-.665s.006-.074-.041-.074h-.523c-.023 0-.035.002-.04-.004-.006-.005-.006-.016-.006-.042v-.852c0-.013.003-.017.016-.017h.575a.013.013 0 00.014-.013v-.312a.016.016 0 01.005-.013c.004-.004.013-.004.013-.004h.875s.016 0 .02.004a.026.026 0 01.006.019v.283c0 .019 0 .028.005.033.004.005.014.005.034.005h.413c.2.003.394.054.57.148.17.091.305.235.384.41.045.097.074.2.088.306.01.075.015.15.014.227v.603c0 .023.002.023.024.023h.103c.177.002.35.045.506.127.11.056.204.138.276.238zM14.5 13.55l.001.005v.887c0 .015-.003.019-.02.019h-3.009c-.02 0-.023 0-.026-.005-.004-.006.004-.02.004-.02l.4-.874a.034.034 0 01.033-.017h.748c.026 0 .038.002.044-.004.005-.005.004-.017.004-.044v-2.663c0-.02 0-.03-.004-.035-.005-.005-.015-.005-.036-.005h-.49c-.023 0-.034 0-.04-.005-.005-.005-.005-.016-.005-.039v-.83c0-.043.005-.042.035-.042h2.013c.025 0 .036-.001.041.004.005.005.004.016.004.039v.831c0 .021 0 .032-.004.037-.005.006-.016.006-.039.006h-.494c-.021 0-.031 0-.036.004-.005.005-.004.015-.004.036v2.68c0 .028 0 .028.028.028h.84l.005.001c.002 0 .003.002.004.003a.014.014 0 01.003.004zM6.888 9.59h.866a.018.018 0 01.018.016v.474c.002.464.004 1.151.004 1.57v1.976a1.1 1.1 0 01-.043.307.696.696 0 01-.341.442.743.743 0 01-.253.076 5.705 5.705 0 01-.538.008.033.033 0 01-.03-.02l-.085-.193a9.274 9.274 0 01-.23-.532c-.002-.027 0-.027.023-.027h.424a.14.14 0 00.15-.09.14.14 0 00.01-.062v-.534c0-.733.003-1.96.004-2.726l.002-.668a.019.019 0 01.019-.018zm4.336 2.838h.498a.015.015 0 01.014.005.015.015 0 01.003.007l-.001.008-.334.736a.014.014 0 01-.013.009h-.949a.596.596 0 01-.194-.032.392.392 0 01-.078-.037.27.27 0 01-.131-.228.293.293 0 01.012-.1 2.3 2.3 0 01.08-.22l.134-.303c.121-.27.273-.611.264-.611h-.338a.573.573 0 01-.19-.033.397.397 0 01-.074-.035.266.266 0 01-.131-.217.322.322 0 01.012-.11c.02-.072.046-.142.076-.21a5.48 5.48 0 01.152-.33l.53-1.19.006-.006a.013.013 0 01.008-.002h.892a.015.015 0 01.012.007.015.015 0 010 .013l-.5 1.126a.085.085 0 00.079.12h.754l.007.002a.015.015 0 01.007.012v.007l-.67 1.51a.072.072 0 00.03.092c.01.006.021.01.033.01zm-1.79.176a.834.834 0 00.088.377c0 .007-.004.014-.016.035l-.165.367c-.116.26-.256.573-.287.637l-.003.006c0 .003-.001.004-.005.005-.005.001-.015-.012-.023-.023a3.002 3.002 0 01-.413-.912 3.54 3.54 0 01-.08-.421 140.685 140.685 0 01-.067-.837l-.015-.198a30.938 30.938 0 01-.022-.288 54.046 54.046 0 00-.042-.54c-.001-.016 0-.02.018-.02h.856c.015 0 .036 0 .036.005a22.29 22.29 0 01.014.165l.011.159a107.627 107.627 0 01.062.789l.013.177.007.1.02.252.005.049c.004.038.008.077.008.116zm-4.048-1.812h.85c.015 0 .017.003.016.02a15.7 15.7 0 00-.007.084l-.006.085a205.5 205.5 0 01-.006.07l-.024.301a31.349 31.349 0 00-.021.288l-.016.198-.015.198-.035.45-.003.041a2.746 2.746 0 01-.096.566 2.96 2.96 0 01-.198.56c-.058.123-.13.24-.213.348a.1.1 0 01-.027.025c-.003 0-.005-.002-.01-.012a42.41 42.41 0 01-.274-.608 30.656 30.656 0 00-.176-.392c-.016-.032-.015-.032-.007-.049l.007-.014a.822.822 0 00.078-.349l.009-.132a18.334 18.334 0 00.012-.148l.011-.138.01-.13.01-.146.01-.118.012-.154c0-.016.002-.032.003-.047a22.317 22.317 0 01.02-.269l.017-.201.01-.134.01-.143a.988.988 0 01.005-.046c0-.004.001-.004.006-.004h.038zm5.001 2.748h.965a.015.015 0 01.018.005.015.015 0 01.003.01.015.015 0 01-.004.009l-.408.885a.014.014 0 01-.013.009H9.814a.706.706 0 01-.283-.071.014.014 0 01-.006-.019l.406-.891a.014.014 0 01.007-.008.014.014 0 01.011 0c.142.046.29.07.438.071zm7.567-2.755h-.005a.01.01 0 01-.007-.007v-.452a.457.457 0 11.842.246.458.458 0 01-.386.213h-.444z" clipRule="evenodd" fillRule="evenodd"></path></svg>
    )
}