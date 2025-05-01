import { LoginForm } from '@/components/login-form';
import { GalleryVerticalEnd } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            mhShohan
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='relative bg-white lg:block'>
        <Image
          src='/images/login-banner.png'
          alt='Image'
          width={700}
          height={1000}
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>
    </div>
  );
}
