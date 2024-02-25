const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[400px] flex justify-between text-sm md:text-md py-8 md:mt-8 md:flex-row space-y-4 md:space-y-0 items-start">
        <div className="flex flex-col text-white">
          <p>Fetured Blogs</p>
          <p>most view</p>
          <p>Readers choice</p>
        </div>
        <div className="flex flex-col text-white">
          <p>forum</p>
          <p>Support</p>
          <p>Recent Post</p>
        </div>
        <div className="flex flex-col text-white">
          <p>Privcy policy</p>
          <p>About use</p>
          <p>Terms & Conditions</p>
          <p>Terms of services</p>
        </div>
      </div>
      <p className="py-2 pb-2 text-center text-white bg-black">
        All rights reserved @Blog market 2023{" "}
      </p>
    </>
  );
};

export default Footer;
