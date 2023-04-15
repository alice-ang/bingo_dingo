type Props = {
  title: string;
  hasSeeAll?: boolean;
  onClick?: () => void;
};

export const SeeAllHeading = ({ title, hasSeeAll = false, onClick }: Props) => {
  return (
    <div className='mt-4 mb-2 flex items-baseline justify-between'>
      <h3 className=' text-2xl font-normal text-gray-900'>{title}</h3>
      {hasSeeAll && (
        <h4 className='text-sm font-medium hover:underline' onClick={onClick}>
          Se alla
        </h4>
      )}
    </div>
  );
};
