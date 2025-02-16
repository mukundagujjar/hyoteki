import Navbar from "@/components/Navbar";

const LegalPage = () => {
  return (
      <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
        <Navbar/>
          <div className="flex flex-col p-8 justify-center md:text-lg gap-8">
              <h1 className="text-2xl font-bold mb-4 underline underline-offset-4">Terms and Conditions</h1>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">1. General Terms</h2>
                  <p>By accessing and using this platform, you agree to be bound by these Terms and Conditions. This platform is independently operated and is <span className="bg-[#1B263B] py-1 px-2 rounded-lg">not affiliated with any governmental organizations</span> or official language testing bodies.</p>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">2. Payment and Refund Policy</h2>
                  <p>All payments made to our platform are <span className="bg-[#1B263B] py-1 px-2 rounded-lg">strictly non-refundable</span>. By making a payment, you acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                      <li>The purchase of any premium features or content is final</li>
                      <li>No refunds will be issued for any reason, including but not limited to:
                          <ul className="list-disc pl-6 mt-2">
                              <li>Dissatisfaction with the service</li>
                              <li>Technical issues on the user's end</li>
                              <li>Failure to use the purchased features</li>
                              <li>Change of mind or accidental purchases</li>
                          </ul>
                      </li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">3. Content Usage and Limitations</h2>
                  <p>All content provided on this platform is for educational purposes only. Users agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                      <li>Use the content solely for personal learning purposes</li>
                      <li>Not redistribute, copy, or sell any content from the platform</li>
                      <li>Not attempt to reverse engineer or replicate the platform's features</li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">4. Privacy Policy</h2>
                  <p>We respect your privacy and are committed to protecting your personal data. By using our platform:</p>
                  <ul className="list-disc pl-6 space-y-2">
                      <li>You consent to the collection of basic usage data for platform improvement</li>
                      <li>Your learning progress and assessment results are stored securely</li>
                      <li>We do not share your personal information with third parties except when required by law</li>
                      <li>Payment information is processed through secure third-party providers</li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">5. Liability Limitations</h2>
                  <p>The platform is provided "as is" without any warranties. We are not liable for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                      <li>Any interruptions in service or technical issues</li>
                      <li>Accuracy of content or translation services</li>
                      <li>User's success or failure in language acquisition</li>
                      <li>Any consequential damages arising from platform use</li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">6. Account Termination</h2>
                  <p>We reserve the right to terminate or suspend any user account that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                      <li>Violates these terms and conditions</li>
                      <li>Engages in fraudulent activity</li>
                      <li>Misuses platform resources or features</li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">7. Governing Law</h2>
                  <p>These terms are governed by and construed in accordance with applicable laws. Any disputes shall be subject to the exclusive jurisdiction of the courts in the relevant jurisdiction.</p>
              </div>

              <div className="mt-8">
                  <p className="italic">Last updated: February 16, 2025</p>
              </div>
          </div>
    </div>
  );
}

export default LegalPage;