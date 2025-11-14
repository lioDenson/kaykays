

export default function LogInWithGoogleBtn(){
    return(
        <a href='/auth/google/redirect' className="flex cursor-pointer gap-2 justify-around items-center rounded-full px-1 py-0.5 bg-gray-400/50 dark:bg-white text-background w-full md:w-8/12">
                            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" className='w-8 h-8' /> Continue With Google
                        </a>
    );
}