import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const hospitalPhone = '+91 08372234599'
  const hospitalEmail = 'care@leelahospitals.in'
  const currentDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          
          {/* Header with Logo and Hospital Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 pb-8 border-b border-gray-200">
            <img 
              src="/Leela__Logo_-1-removebg-preview.png" 
              alt="Leela Hospital Logo" 
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Leela Hospital</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Gadag, Karnataka</p>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Last Updated: {currentDate}</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 sm:space-y-10 text-gray-700 text-sm sm:text-base">
            
            {/* Section 1 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">1. Information We Collect</h3>
              <p className="leading-relaxed">
                We collect your name, contact number, and preferred appointment details when you book an appointment through our website. This information is essential for us to process and manage your appointment request.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">2. Purpose Limitation</h3>
              <p className="leading-relaxed mb-3 sm:mb-4">
                We use your personal information only for booking and managing your appointment. We will not use your data for marketing, advertising, or any other purpose without obtaining your separate consent.
              </p>
              <p className="leading-relaxed text-xs sm:text-sm text-gray-600">
                Your data is used exclusively for:
              </p>
              <ul className="list-disc list-inside mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-gray-700">
                <li>Confirming your appointment</li>
                <li>Sending appointment reminders</li>
                <li>Communicating with you regarding your appointment</li>
                <li>Maintaining medical records related to your visit</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">3. Consent</h3>
              <p className="leading-relaxed">
                By checking the consent box and submitting the appointment form, you give your explicit consent for us to process your data for the above purpose. Your consent is voluntary and can be withdrawn at any time by contacting us.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">4. Your Rights</h3>
              <p className="leading-relaxed mb-3 sm:mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700">
                <li><strong>Access:</strong> You have the right to access your appointment data</li>
                <li><strong>Correction:</strong> You can request correction of any incorrect information</li>
                <li><strong>Deletion:</strong> You can request deletion of your data</li>
                <li><strong>Withdraw Consent:</strong> You can withdraw your consent at any time</li>
              </ul>
              <p className="leading-relaxed mt-3 sm:mt-4">
                To exercise any of these rights, please contact the hospital reception at <a href={`tel:${hospitalPhone}`} className="text-blue-600 hover:text-blue-700 font-semibold">{hospitalPhone}</a> or email <a href={`mailto:${hospitalEmail}`} className="text-blue-600 hover:text-blue-700 font-semibold break-all">{hospitalEmail}</a>.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">5. Security Safeguards</h3>
              <p className="leading-relaxed mb-3 sm:mb-4">
                We take reasonable security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700">
                <li>Use of secure servers with encryption protocols</li>
                <li>HTTPS encryption for all data transmission</li>
                <li>Restricted access to authorized staff only</li>
                <li>Regular security audits and updates</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">6. Data Storage</h3>
              <p className="leading-relaxed">
                Your personal data is stored on secure servers located in India. We maintain your data for the duration necessary to fulfill the purposes outlined in this policy, and in accordance with applicable legal requirements.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">7. Data Breach Notification</h3>
              <p className="leading-relaxed">
                In the event of a personal data breach, Leela Hospital will notify the Data Protection Board of India and the affected individuals as soon as possible via phone call or SMS to the contact number provided during appointment booking.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">8. Changes to This Privacy Policy</h3>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. The updated policy will be posted on this page with the new "Last Updated" date. Continued use of our appointment booking service after such changes constitutes your acceptance of the revised policy.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">9. Contact Us</h3>
              <p className="leading-relaxed mb-3 sm:mb-4">
                If you have any questions about this Privacy Policy or our data handling practices, please contact us:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 space-y-3">
                <div className="flex items-start sm:items-center gap-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">Phone</p>
                    <a href={`tel:${hospitalPhone}`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base">
                      {hospitalPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start sm:items-center gap-3">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">Email</p>
                    <a href={`mailto:${hospitalEmail}`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base break-all">
                      {hospitalEmail}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Booking
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
