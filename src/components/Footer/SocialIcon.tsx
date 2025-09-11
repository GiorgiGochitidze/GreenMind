type SocialIconType = {
  Icon: React.ElementType;
  size: number;
};

const SocialIcon = ({ Icon, size }: SocialIconType) => {
  return (
    <div className="social-icon">
      <Icon fill="gray" size={size} />
    </div>
  );
};

export default SocialIcon;
