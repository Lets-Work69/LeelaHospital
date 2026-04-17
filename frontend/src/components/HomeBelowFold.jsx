import Stats from './Stats'
import Services from './Services'
import WhyUs from './WhyUs'
import Doctors from './Doctors'
import Testimonials from './Testimonials'
import Appointment from './Appointment'
import Footer from './Footer'

/** Below-the-fold home sections — loaded as a separate chunk via React.lazy in App.jsx */
export default function HomeBelowFold() {
  return (
    <>
      <Stats />
      <Services />
      <WhyUs />
      <Doctors />
      <Testimonials />
      <Appointment />
      <Footer />
    </>
  )
}
