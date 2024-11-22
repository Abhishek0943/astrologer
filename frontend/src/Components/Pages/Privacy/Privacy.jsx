import React, { useEffect } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import styles from "./Privacy.module.css"
function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <>
            <Navbar />
            <div className={styles.warper} style={{ height: "auto" }}>
                <div className={styles.top}>
                    <div className={styles.image}>
                        <div className={styles.overlay}>
                            <h3>Privacy Policy</h3>
                        </div>
                        <img src="/privacy.jpg" className={styles.img} alt="Privacy" />
                    </div>
                </div>
                <div className={styles.content}>
                    <p>
                        www.kosychic.com (“we”, “Ko-sychic”, “Ko-sychic” (web and application) hereinafter referred as “website”) is committed to protect the privacy of the users of the website (including astrologers and buyers/customers whether registered or not registered). Please read this privacy policy carefolly to understand how the website is going to use your information supplied by you to the Website.
                    </p>
                    <p>
                        This Privacy Policy is published in accordance with Role 3(1) of the Information Technology (Intermediaries Guidelines) Roles, 2011 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Roles, 2011 which requires publishing of the Privacy policy for collection, use, storage and transfer of sensitive personal data or information.
                    </p>
                    <h4>USER’S CONSENT</h4>
                    <p>
                        This Privacy Policy, which may be updated/amended from time to time, deals with the information collected from its users in the form of personal identification, contact details, birth details and any forecast made using the supplied information and how such information is further used for the purposes of the Website. By accessing the website and using it, you indicate that you understand the terms and expressly consent to the privacy policy of this website. If you do not agree with the terms of this privacy policy, please do not use this website.
                    </p>
                    <p>
                        Your continued use of this website shall confirm that you have provided your unconditional consent and confirm to the terms of this privacy policy as regards collecting, maintaining, using, processing and disclosing your personal and other information in accordance with this Privacy Policy.
                    </p>
                    <p>
                        This Privacy Policy is to be read along with the respective Terms of Use or other terms and conditions as provided on the Website.
                    </p>
                    <h4>Collection of Personal Information</h4>
                    <p>
                        Creating a user profile with Ko-sychic involves providing specific information. The mandatory details include your phone number for OTP (One-Time Password) verification, which is necessary to ensure the security and validity of the registration process. Additionally, you are required to provide your first name, last name, and date of birth (DOB) are optional. The date of birth can be considered an optional detail, which means it's not mandatory to provide it during the registration process.
                    </p>
                    <h4>Purpose and Use of Data/Information Collection</h4>
                    <p>
                        By collecting this information, Ko-sychic aims to create a personalized user profile that can cater to your specific needs and preferences. However, if you choose not to provide your date of birth, it won't hinder the registration process, and you can still access the services offered by Ko-sychic with your verified phone number.
                    </p>
                    <h4>Data Deletion</h4>
                    <p>
                        <strong>Delete Profile:</strong> If you wish to delete your entire Ko-sychic profile, including personal information associated with it, you might find an option to "Delete your account". Click on this setting option in side menu and follow the instructions and complete the account deletion process. You can reach us for deletion of your data by visiting Contact-us page.
                    </p>
                    <h4>Commitment</h4>
                    <p>
                        The Website intends to protect the privacy of all kinds of users visiting the platform irrespective of whether the user is a registered user or merely a visitor. It is recommended to every user to understand what types of personally identifiable information are collected. The Website employs the personally identifiable information for certain predictions; however, it is guaranteed that no direct or indirect use of such information which is revealed in the prediction for a member will be done except for the explicit purpose of communicating the horoscope charts and predictions to the member itself disclosing such information. It is further clarified that the Website does not in any manner deal in selling or renting the information supplied to the Website.
                    </p>
                    <p>
                        The Website does not commit to treat or provide solutions for users with weak mental health which is inclusive of any user who has thoughts related to committing suicide, self-destruction, etc. Such users are advised to stop the use of the present website with immediate effect and any continued use of the website by such person woold be considered solely at the user’s risk and the Website shall have no liability for any untoward event in such a scenario. The Website declares that the information provided by such kind of user can be shared, if required, with law enforcement authorities. Such information is not protected from any kind of non-disclosure or confidential agreements either with the Website or with any third party involved herein.
                    </p>
                    <p>
                        The Website does not commit in any manner whatsoever to the accuracy of the predictions made by the astrologers to any user. The Website does not take any guarantee/responsibility/liability regarding the reliability or reality of the gems and other related items represented and sold on the website. It is further declared by the Website that no warranty on such service is provided by the Website in any manner.
                    </p>
                    <h4>Information Collected by Website</h4>
                    <h4>Personal Identifiable Information:</h4>
                    <p>
                        The information qualifies as personal in nature when the information collected identifies a specific end user. Such information woold be collected by the website during the following actions:
                    </p>
                    <ol>
                        <li>Creating an account / Registration data: While accessing the Website, the User of the Website may be required to create an account. The personal information which may be sought while creating an account shall include, but not limited to the Foll name, Address, Telephone Number, Email-address, Date of Birth, Gender, Location, Photograph, any other items of ‘sensitive personal data or information” as such term is defined under the Information Technology (Reasonable Security Practices And Procedures And Sensitive Personal Data Of Information) Roles, 2011 enacted under the Information Technology Act, 2000, and any other detail required on the website during registration. It is hereby informed to all the Users that the e-mail address or phone number together with a password or OTP is used for the purpose of securing User’s profile and for effective implementation of the personalized E-mail and SMS Services provided by the Website to the User. In the event that no registration is made by the User, the Website may not be able to provide any services due to non-availability of the personal identifiable information of the User.</li>
                        <li>Booking a paid service: While booking a service through Order Form, the personal information which may be sought woold include, but not limited to the information as mentioned in Column 1(a), financial information inclusive of bank account information, credit card or debit card details or other payment instrument details through a secure third party gateway, IP (Internet protocol) Address and any other information that a User may provide during booking a paid service on the Website. Such information is kept highly confidential.</li>
                    </ol>
                    <h4>Log Files, IP Address and Cookies:</h4>
                    <p>
                        The website collects information that is stored by your browser on your computer’s hard drive i.e. through cookies. It further automatically logs generic information about the user’s computer connection to the Internet i.e. Session Data. The website may store temporary or permanent ‘cookies’ on the user’s computer. Cookies woold allow the web server to recognize the user computer each time the user returns to the website including the time and date of the visit, viewing of page, length of time, verify registration or password information etc. Such cookies are usually only read by the server placed and the user may choose to block these cookies on their computers. Please note that if the cookies are turned off, the user may be prevented from using certain features of the website. The website uses the cookies to personalize the user’s experience on the website and to display an advertisement according to the user’s preferences. Some of the services provided by the Website may direct the User to platform of third parties. Any Information provided by the User on such platforms may be dealt by them in the manner provided by the privacy policy formolated by such third-party platforms. The Website in this regard folly disclaims any liability(ies) or claim(s) which may arise by use/misuse of such information shared by the User, to any third party or any party not known to the Website. The website woold not liable for the mis-use of such information shared by the User or by any third party.
                    </p>
                    <h4>Miscellaneous Activities:</h4>
                    <p>
                        The Website may collect any other information which may be mandatory to be disclosed and further may receive any other information via email or other method inclusive of contract with regard to specific services availed from the Website or any products bought from the Website, such information may not be made part of the User Member’s Profile but shall be used only for addressing the specific need or concern of the User.
                    </p>
                    <h4>Non-Personal Identifiable Information</h4>
                    <p>
                        The information qualifies as non-personal in nature when the information collected does not identify a specific end user. Such information is collected when the user visits the Website, cookies, etc. and woold include but not limited to the following:
                    </p>
                    <ol>
                        <li>URL (Uniform Resource Locator) of the previous website visited by the User before visiting this website or the URL of the website the User visits after visiting this Website.</li>
                        <li>Internet service provider / IP Address / Telecom service provider.</li>
                        <li>Type of Browser used for accessing the website.</li>
                        <li>Geographical Location.</li>
                    </ol>
                    <p>
                        Such non-personal identifiable information is used by the Website for the purposes including but not limited to troubleshoot connection problems, administer the website, analyze trends, gather demographic information, frequency of visits to the website, average length of visits, pages viewed during a visit, compliance with applicable law, and cooperate with law enforcement activities, etc.
                    </p>
                    <p>
                        The information is used for improving the site content and performance and the website may share this information with Third Party Service Providers and Third Party Advertisers to measure the overall effectiveness of the website’s online advertising, content, programming and for other bonafide purpose as required.
                    </p>
                    <p>
                        THE USER HEREBY REPRESENT AND CONFIRMS THAT THE INFORMATION PROVIDED TO THE WEBSITE IS AUTHENTIC, CORRECT, CURRENT AND UPDATED. THE WEBSITE AND ITS ENTITIES SHALL NOT BE RESPONSIBLE FOR THE AUTHENTICITY OF THE INFORMATION THAT THE USER MAY PROVIDE. THE USER SHALL BE PERSONALLY LIABLE AND INDEMNIFY THE WEBSITE FOR THE BREACH OF ANY PROVISION.
                    </p>
                    <h4>Security Measures</h4>
                    <p>
                        The security of the personal information supplied by the User is very important to the Website and the website for the purpose of securing the information takes various measures inclusive of taking reasonable steps such as physical and electronic security measures to guard against the unauthorized access to the information. The personal information of a user is collected on a secured server. The payment details are entered on the Payment Gateway’s or Bank’s page on a secured SSL. The data is transferred between Bank’s page and payment’s gateways in an encrypted manner. However please note that no data transmission can be guaranteed to be completely secure. Hence the user is advised to take precaution and care against any sharing of the details submitted on the website included the log-in details as generated after registration. The website is not responsible for the security or confidentiality of communications the user may send through the internet using email messages, etc.
                    </p>
                    <h4>Usage of the Information</h4>
                    <p>
                        The information collected by the Website may be used for any purpose as may be permissible under the applicable law and shall include but not limited to the following:
                    </p>
                    <ol>
                        <li>For providing a personalised browsing experience. While guaranteeing the anonymity of the user, the personal information collected in Clause “Personal Identifiable Information” may be used for research purposes, for improving the marketing and promotional efforts, to analyze usage, improve the content of the Website, product offering and for customizing the Website’s layout for suiting the needs of its Users.</li>
                        <li>With IP tracking details and Cookies data, the Website will use it only for facilitating the usage of the website and provide personalized experience and any information which is sensitive in nature will not be provided to any third party without the consent of the User.</li>
                    </ol>
                    <h4>Retention, Usage, Confidentiality, and Children Privacy Policy</h4>
                    <p>
                        All information (and copies thereof) collected by Website, including without limitation Personal Information, User Data, and other information related to your access and use of the services offered by Website, may be retained by Website for such period as necessary, including but not limited to, for purposes such as compliance with statutory or legal obligations, tax laws and potential evidentiary purposes and for other reasonable purposes such as to implement, administer, and manage your access and use of our services, or resolution of any disputes.
                    </p>
                    <p>
                        To ensure a seamless experience at the Website for you and to ensure your maximum benefit and comfort, the Website may use the data collected through cookies, log file, device identifiers, location data and clear gifs information to:
                    </p>
                    <ol>
                        <li>Remember information so that you will not have to re-enter it during your visit or the next time you visit the site.</li>
                        <li>Provide custom, personalized content and information, including advertising.</li>
                        <li>Provide and monitor the effectiveness of Services offered by Website.</li>
                        <li>Monitor aggregate metrics such as total number of visitors, traffic, usage, and demographic patterns on the Website and its Services.</li>
                        <li>Diagnose or fix technology problems.</li>
                        <li>Otherwise plan for and enhance the service.</li>
                    </ol>
                    <p>
                        Website uses certain third-party analytics tools to measure traffic and usage trends for the Services. These tools collect information, which is not personal or sensitive in nature sent by the User’s device, including the web pages visited, add-ons, and other information that assists the Website in improving the Services. Such information is collected from Users in the form of anonymized logs, so that it cannot reasonably be used to identify any particolar individual User.
                    </p>
                    <h4>Confidentiality</h4>
                    <p>
                        The website aspires to takes care of all the information provided to it by its Users which may be termed as confidential. Such confidential information which is not required to be disclosed to the website, is specifically excluded from the definition of Personal Information and shall not be collected/used. The confidential information of the User shall not be disclosed or shared by the Websites, its employees, its agents or any third-party contractors including the experts either orally or in writing except for the following circumstances:
                    </p>
                    <ol>
                        <li>If Website believes that there is a significant/ real/ imminent threat or risk to User’s health, safety or life or to the health, safety or life of any other person or the public.</li>
                        <li>If such confidential information must be shared in accordance with the law inclusive of any investigation, Court summons, judicial proceedings etc.</li>
                        <li>To protect and defend the rights or property of the Website.</li>
                    </ol>
                    <h4>Children Privacy Policy</h4>
                    <p>
                        The Website requires that the User visiting and using the services are above 18 years of age however some service information is accessible to children under the age of 18 as well. However, it is stressed upon that website is not designed or intended to be attractive to be used by children under the age of 13 and no personal identifiable information of children below the age of 13 is collected knowingly. IF YOU ARE UNDER 13 YEARS OF AGE, PLEASE DO NOT USE ANY OF THE SERVICE PROVIDED BY THE WEBSITE AT ANY TIME OR IN ANY MANNER. If it comes to the knowledge of the concerned parent regarding sharing of any information of a child under the age of 13, contact the Website immediately. We will take appropriate steps and delete the data from the Website’s systems.
                    </p>
                    <h4>Safety and Security</h4>
                    <p>
                        Kosychic.com honors users' privacy and employs the best practice to secure the user's personal details, such as birth details, address, etc., and also financial details such as credit card or debit card transaction details. Kosychic.com uses the best encryption methodologies to ensure secure transactions from our side and thus encourages our clients to use their credit/debit cards on Ko-sychic.com with foll confidence. By doing so, we strive for the safety and security of our users, thus making their experience with Kosychic.com absolutely safe and secure.
                    </p>
                </div>
            </div>
            <hr />
            <Footer />
        </>
    )
}

export default Privacy
