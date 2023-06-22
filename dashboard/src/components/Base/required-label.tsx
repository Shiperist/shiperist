const RequiredLabel = ({ text }: { text: string }) => {
  return (
    <p className="text-sm text-ctp-text">
      {text}
      <span className="text-red-600"> *</span>
    </p>
  );
};

export default RequiredLabel;
