import { Carousel } from "flowbite-react";
const Hero = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img
          src="https://www.montgomerycountymd.gov/library/resources/images/for-you/job-seekers-banner-image.jpg"
          alt="..."
        />
        <img src="https://neo-blog.kalibrr.com/blog/wp-content/uploads/2022/09/sudah-siapkah-recruiter-dan-job-seeker-menghadapi-the-future-of-hiring-1326x446.jpg" alt="..." />
        <img src="https://www.brimbanklibraries.vic.gov.au/media/com_eventbooking/images/thumbs/Online-Job-Search-Event-Tile-December-2017.jpg" alt="..." />
        <img src="https://www.michaelpage.com.sg/sites/michaelpage.com.sg/files/styles/advice_node_desktop/public/2021-04/Untitled%20design-8.png?itok=UFvqxtR3" alt="..." />
      </Carousel>
    </div>
  );
};
export default Hero;
