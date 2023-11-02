type PageTitleProps = {
  iconUrl?: string;
  title: string;
};

const PageTitle = ({ iconUrl, title }: PageTitleProps) => {
  return (
    <div className='flex items-center gap-2.5 self-start'>
      {iconUrl && (
        <img src={iconUrl} className='invert-white' width={36} height={36} />
      )}
      <h2 className='h3-bold md:h2-bold w-full'>{title}</h2>
    </div>
  );
};

export default PageTitle;
