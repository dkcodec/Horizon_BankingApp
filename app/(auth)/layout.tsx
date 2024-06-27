import Image from 'next/image'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex min-h-screen w-full justify-between font-inter'>
      {children}
      <div className='auth-asset'>
        <Image
          src='/icons/auth-image.svg'
          width={500}
          height={500}
          alt='auth'
        />
      </div>
    </main>
  )
}
