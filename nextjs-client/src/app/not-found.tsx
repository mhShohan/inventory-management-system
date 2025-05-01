const NotFound = () => {
  return (
    <div className='flex justify-center bg-background items-center h-screen'>
      <div className='w-[500px] h-[250px] bg-foreground/10 shadow-2xl rounded-lg flex justify-center items-center flex-col'>
        <h1 className='text-2xl font-bold text-foreground'>404! Not Found!</h1>
        <h3 className='text-lg font-bold text-foreground'>
          Your requested page does not exists...!!!
        </h3>
        <button className='py-2 px-8 bg-foreground text-background mt-2 rounded-md font-semibold flex gap-1 items-center'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
