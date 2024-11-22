import React, { useEffect } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import styles from "./Privacy.module.css"
function TermAndCondition() {
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
                            <h3>Terms and Conditions</h3>
                        </div>
                        <img src="/privacy.jpg" className={styles.img} alt="Privacy" />
                    </div>
                </div>
                <div className={styles.content}>
                    <p>
                        These terms and conditions of Use (hereinafter referred as “Terms of Usage”) describe and govern the User’s use of the content and services offered by Ko-sychic through www.kosychic.com (hereinafter referred as “We” “Ko-sychic” “us” “our” “Ko-sychic application” “Website”).
                    </p>
                    <h4>UPDATION</h4>
                    <p>
                        The Website may update/amend/modify these Terms of Usage from time to time. The User is responsible to check the Terms of Usage periodically to remain in compliance with these terms.
                    </p>
                    <h4>USER CONSENT</h4>
                    <p>
                        By accessing the Website and using it, you (“Member”, “You”, “Your”) indicate that you understand the terms and unconditionally & expressly consent to the Terms of Usage of this Website. If you do not agree with the Terms of Usage, please do not click on the “I AGREE” button. The User is advised to read the Terms of Usage carefully before using or registering on the Website or accessing any material, information or services through the Website. Your use and continued usage of the Website (irrespective of the amendments made from time to time) shall signify your acceptance of the terms of usage and your agreement to be legally bound by the same.
                    </p>
                    <h4>GENERAL DESCRIPTION</h4>
                    <p>
                        The Website is an internet-based portal having its existence on World Wide Web, Application and other electronic medium and provides astrological content, reports, data, telephone, video and email consultations (hereinafter referred as “Content”). The Website is offering “Free Services” and “Paid Services” (Collectively referred as “Services”). Free Services are easily accessible without becoming a member however for accessing the personalised astrological services and/or receive additional Content and get access to Paid Services, You are required to register as a member on the portal. By registering for Paid Services, a Member agrees to:
                    </p>



                    <p>To provide current, complete, and accurate information about himself as prompted to do so by the Website</p>
                    <p>To maintain and update the above information as required and submitted by you with the view to maintain the accuracy of the information being current and complete.</p>
                    <h4>Registration and Eligibility</h4>
                    <p>
                        By using this website, you agree that you are over the age of 18 years and are allowed to enter into a legally binding and enforceable contract under Indian Contract Act, 1872. The Website would not be held responsible for any misuse that may occur by virtue of any person including a minor using the services provided through the Website. You are however allowed to ask questions related to minors in your family as per the terms and conditions outlined herewith in this policy.
                    </p>
                    <p>
                        For the User to avail the services, the User will be directed to Register as a Member on the Website whereby You (User) agree to provide update, current and accurate information while filling up the sign-in form. All information that you fill and provide to the Website and all updates thereto are referred to in these Terms of Usage as “Registration Data“.
                    </p>
                    <p>
                        An account could be created by you through the Website ID (Your Phone Number) and password (OTP) or other log - in ID and password which can include a facebook, gmail or any other valid email ID. The User while creating an account hereby represents and warrants that all the information provided by the User is current, accurate and complete and that the User will maintain the accuracy and keep the information updated from time to time. Use of another User’s account information for availing the services is expressly prohibited. If in case it is found that the information so supplied on the Website is inaccurate, incomplete, untrue and not current, the Website has the right to suspend or terminate the User’s account and restrict/refuse the use of the Website by such User in future.
                    </p>
                    <p>
                        The right to use this Website is personal to the User and is not transferable to any other person or entity. The User would be responsible for protecting the confidentiality of User’s passwords and other information required for the purposes of registration. The User would be fully responsible for all the activities that occur under the User’s account with the Website. The Website cannot and will not be liable for any loss or damage arising from the User’s failure to maintain secrecy and confidentiality. The User shall notify the Website immediately if they become aware of any unauthorized use of their Account(s) or breach of any security. The User must log out from its account at the end of the session.
                    </p>
                    <p>
                        The User while availing any service shall be informed whether the service so rendered is personal to the Website or is available from a Third party. The Website shall have no control or monitoring on the information disseminated to any third party via the Website.
                    </p>
                    <p>
                        The User agrees, understands and confirms that his/ her personal data including without limitation to details relating to debit card/ credit card transmitted over the Internet may be susceptible to misuse, hacking, theft and/ or fraud and that the Website or the Payment Service Provider(s) have no control over such matters.
                    </p>
                    <p>
                        The Website does not permit the use of the Services by any User under the following conditions:
                    </p>
                    <ul>
                        <li>If the User is a resident of any jurisdiction that may prohibit the use of the Services rendered by the Website.</li>
                        <li>Due to any religious practices.</li>
                        <li>If the User has created multiple accounts using various mobile numbers. The User may not have more than one active account with the Website.</li>
                    </ul>
                    <p>
                        WEBSITE CONTENT
                    </p>
                    <p>
                        The Website and any individual Websites which may be available through external hyperlinks with the Website are private property.
                    </p>
                    <p>
                        All interaction on this Website inclusive of the guidance and advice received directly from the Licensed Provider must comply with these Terms of Usage.
                    </p>
                    <p>
                        The User shall not post or transmit through this Website any material which violates or infringes in any way upon the rights of others, or any material which is unlawful, abusive, defamatory, invasive of privacy, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any law.
                    </p>
                    <p>
                        The Website shall have a right to suspend or terminate access by such User or terminate the User’s registration and such User shall not gain access to the Website.
                    </p>
                    <p>
                        The Website reserves the right to terminate the access or to change or discontinue any aspect or feature of the Website including, but not limited to, content, graphics, deals, offers, settings, etc.
                    </p>
                    <p>
                        Any information other the guidance and advice, received directly from the Third-Party Service Provider, the educational, graphics, research sources and other incidental information on the Site, the content, should not be considered as medical advice.
                    </p>
                    <p>
                        The Website does not take guarantee regarding the medical advice, if provided, by the third-party service provider inclusive of registered astrologers with the site. The User should always talk to an appropriately qualified health care professional for diagnosis and treatment including information regarding which medications or treatment may be appropriate for the User. None of the Content represents or warrants that any particular medication or treatment is safe, appropriate, or effective for you. Ko-sychicdoes not endorse any specific tests, medications, products or procedures.
                    </p>
                    <p>
                        The Website does not take guarantee of any untoward incident that may happen with the User after seeking the Service. The Website or the Service Provider providing the advice is not liable and does not guarantee any results as expected by the User and accessing the Website in such scenario is purely at the risk of the User.
                    </p>
                    <p>
                        By using the Site, Application or Services, User hereby agrees that any legal remedy or liability that you seek to obtain for actions or omissions of other Members inclusive of the service provider registered with the Website or other third parties linked with the Website, shall be limited to claim against such particular party who may have caused any harm. You agree not to attempt to impose liability on or seek any legal remedy from the Website with respect to such actions or omissions.
                    </p>
                    <h4>User Account Access</h4>
                    <p>
                        The Website shall have access to the account and the information created by the User for ensuring and maintaining the high-quality services provided by the Website and for addressing the need of the customer in the most effective manner. User hereby consents for the unconditional access of the account by the Website, its employees, agents and other appointed person in such regard. For the purpose of addressing the complaints (if any received) and any suspected abuse reported, the Website shall investigate on case-to-case basis from the records available. The User is directed to read the terms provided in the Privacy Policy as regards such records.
                    </p>
                    <h4>Privacy Policy</h4>
                    <p>
                        The User hereby consents, expresses and agrees that the User has read and fully understand the Privacy Policy of the Website. The User further consents that the terms and contents of such Privacy policy is acceptable to the User inclusive of any update/alteration/change made and duly displayed on the Website.
                    </p>
                    <h4>Breach and Termination</h4>
                    <p>
                        The Website may, in whole or in part, without informing the User, modify, discontinue, change or alter the services ordered or the Account of the User registered with the Website. The Website may or may not issue notice or provide any reason for such action taken by the Website.
                    </p>
                    <p>
                        Violation of any conditions mentioned in this Terms of Usage shall lead to immediate cancellation of the Registration of the User, if registered with the Website. The Website reserves right to terminate and initiate action immediately, if:
                    </p>
                    <ul>
                        <li>The Website is not able to verify and authenticate the Registration data or any other relevant information provided by the User.</li>
                        <li>The Website believes that the actions of the User may cause legal liability for the Website, other Users or any service provider linked with the Website.</li>
                        <li>The Website believes that the User has provided the Website with false and misleading Registration Data or there is interference with the other Users or the administration of the services, or have violated the privacy policy as listed by the Website.</li>
                    </ul>
                    <p>
                        For the Service Provider inclusive of the Astrologer, You understand and agree that your relationship with the Website is limited to being a member and You act exclusively on your own behalf and for your own benefit. The Website may terminate and de-activate the Profile of such service provider for any violation of the present terms of usage and the Service Terms and Conditions agreed upon between the parties while registration of the data by such Service Provider.
                    </p>
                    <h4>User Obligation</h4>
                    <p>
                        The User (inclusive of the astrologer and the Member Customer) under an obligation not to violate the privacy policy, terms and conditions and any other terms as defined on the Website. The User represents that he is an individual and not a corporation or other legal business entity. The rights to use the Website’s services is personal to the User.The User shall while using the Website and engaged in any form of communication on any of the forums inclusive of the products listed on the Website shall not violate the terms and conditions which are inclusive of:-
                    </p>
                    <ul>
                        <li>The User shall not Post, publish or transmit any messages that is false, misleading, defamatory, harmful, threatening, abusive, harassing, defamatory, invades another's privacy, offensive, promotes racism, hatred or harm against any individual or group or religion or caste, infringes another's rights including any intellectual property rights or copyright or trademark, violates or encourages any conduct that would violate any applicable law or regulation or would give rise to civil liability.</li>
                        <li>The User shall not upload or post or otherwise make available any content that User do not have a right to make available, under any law or under contractual or fiduciary relationships.</li>
                        <li>The User shall not upload or post or otherwise make available any content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party. The User may, however, post excerpts of copyrighted material so long as they adhere to Fair Use guidelines.</li>
                        <li>The User shall not collect screen names and email addresses of members who are registered on the Website for purposes of advertisement, solicitation or spam.</li>
                        <li>The User shall not send unsolicited email, junk mail, spam, or chain letters, or promotions or advertisements for products or services.</li>
                        <li>The User shall not upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Website or another’s computer.</li>
                        <li>The User shall not engage in any activity that interferes with or disrupts access to the Website</li>
                        <li>The User shall not attempt to gain unauthorized access to any portion or feature of the Website, any other systems or networks connected to the Website, to any of the services offered on or through the Website, by hacking, password mining or any other illegitimate means.</li>
                        <li>The User shall not violate any applicable laws or regulations for the time being in force within or outside India. The use and continuous use of the Website is subject to but not limited to using the services for personal use.</li>
                        <li>The User shall not resell or make any commercial use of the Services without the express written consent from the Website.</li>
                        <li>The User shall not violate these Terms of Usage including but not limited to any applicable Additional terms of the Website contained herein or elsewhere.</li>
                        <li>The User shall not Reverse engineer, modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Website.</li>
                    </ul>
                    <p>The User by becoming a Registered member of the Website agrees to the following situations, which list is not exhaustive and may include services incidental to the below mentioned: -</p>
                    <ul>
                        <li>The user agrees to receive communication through the app/website through email/SMS or any other communication medium including though Whatsapp Business Messages in regards to the usage of the app/website.</li>
                        <li>The User agrees not to transmit via the Website any unlawful, harassing, libelous, abusive, threatening, harmful, vulgar, obscene or otherwise objectionable material of any kind or nature.</li>
                        <li>The User not to transmit any material that encourages conduct that could constitute a criminal offense, give rise to civil liability, or otherwise violate any applicable local, state, national or international law or regulation. Attempts to gain unauthorized access to other computer systems are prohibited.</li>
                        <li>The User shall not interfere with any other members' use or enjoyment of the Website or Services.</li>
                    </ul>
                    <p>
                        The User is under an obligation to report any misuse or abuse of the Site. If you notice any abuse or misuse of the Site or anything which is in violation of this Agreement, you shall forthwith report such violation to Website by writing to Customer Care. On receipt of such complaint, Website may investigate such complaint and if necessary, may terminate the membership of the Member responsible for such violation abuse or misuse without any refund of the subscription fee.
                    </p>
                    <p>
                        Any false complaint made by a Member shall make such Member liable for termination of his / her membership without any refund of the subscription fee.
                    </p>
                    <p>
                        The Website reserves the right to withdraw its services to any customer who is found to be unreasonable or abusive during their conversation with the Service Provider inclusive of astrologer regardless of any reason.
                    </p>
                    <p>
                        While the Website shall take all steps to resolve any situation that is in violation of the above obligations arises, however if the situation is not controllable, the Website reserves its right to send a written warning henceforth. Such violations, if repeated by the User, shall lead to a total ban for transacting on the platform by such User. If any balance is present in the wallet of the User, the same shall be refunded subject to the other charges that may be applicable for such violations.
                    </p>
                    <h4>Disclaimer / Limitation of Liability / Warranty</h4>
                    <p>
                        The User expressly understands and agree that, to the maximum extent permitted by applicable law, the Website does not provide warranties for the service. Astrological counselling provided through the Website is based on cumulative or individual knowledge, experience and interpretations of astrologers and as such, it may vary from one astrologer to another.
                    </p>
                    <p>
                        The Website is offering services through a diverse panel of Astrologers duly verified by the Website and such Service Provider (Astrologer) may from time to time make recommendations of using mantras, jantras, gemstones or other astrological remedies to be used by User. Such recommendations are being made in good faith by the astrologers and the Website and its subsidiaries, affiliates, officers, employees, agents, partners, and licensors make no warranty that:
                    </p>
                    <ul>
                        <li>the service will meet your requirements</li>
                        <li>the service will be uninterrupted, timely, secure or error - free</li>
                        <li>the results that may be obtained from the use of the service will be accurate or reliable</li>
                        <li>the quality of any products, services, information or other material purchased or obtained by you through the service will meet your expectations</li>
                        <li>any errors in the software will be corrected. You are required to make full disclosure about the emotional, mental and physical state of the person seeking advice from the panel of astrologers of Website so that the astrologers make an informed judgment about giving advice.</li>
                    </ul>
                    <h4>Disclaimer / Limitation of Liability / Warranty</h4>
                    <p>
                        The Website, services and other materials are provided by the Website on an "as is" basis without warranty of any kind, express, implied, statutory or otherwise, including the implied warranties of title, non-infringement, merchantability or fitness for a particular purpose. Without limiting the foregoing, the Website makes no warranty that:
                    </p>
                    <ul>
                        <li>the Website or the services will meet your requirements or your use of the Website or the services will be uninterrupted, timely, secure or error-free;</li>
                        <li>the results that may be obtained from the use of the Website, services or materials will be effective, accurate or reliable;</li>
                        <li>the quality of the Website, services or other materials will meet your expectations; or that</li>
                        <li>any errors or defects in the Website, services or other materials will be corrected. No advice or information, whether oral or written, obtained by the User from the Website or through or from use of the services shall create any warranty not expressly stated in the terms of use.</li>
                    </ul>
                    <p>
                        To the maximum extent permitted by applicable law, the Website will have no liability related to User content arising under intellectual property rights, libel, privacy, publicity, obscenity or other laws. The Website also disclaims all liability with respect to the misuse, loss, modification or unavailability of any User content.
                    </p>
                    <p>
                        The Website will not be liable for any loss that the User may incur as a consequence of unauthorized use of their account or account information in connection with the Website or any services or materials, either with or without the User’s knowledge. The Website has endeavored to ensure that all the information on the Website is correct, but the Website neither warrants nor makes any representations regarding the quality, accuracy or completeness of any data, information, product or service. The Website shall not be responsible for the delay or inability to use the Website or related functionalities, the provision of or failure to provide functionalities, or for any information, software, products, functionalities and related graphics obtained through the Website, or otherwise arising out of the use of the Website, whether based on contract, tort, negligence, strict liability or otherwise. Further, the Website shall not be held responsible for non-availability of the Website during periodic maintenance operations or any unplanned suspension of access to the Website that may occur due to technical reasons or for any reason beyond the Website's control.
                    </p>
                    <p>
                        The User understands and agrees that any material or data downloaded or otherwise obtained through the Website is done entirely at their own discretion and risk and they will be solely responsible for any damage to their computer systems or loss of data that results from the download of such material or data. The Website is not responsible for any typographical error leading to an invalid coupon. The Website accepts no liability for any errors or omissions, with respect to any information provided to you whether on behalf of itself or third parties.
                    </p>
                    <p>
                        The Services provided by the Website are for entertainment purposes only and the Website on behalf of itself and its suppliers, disclaims all warranties of any kind, express or implied, including without limitation any warranty of merchantability, fitness for a particular purpose, title, non-infringement and it makes no warranty or representation regarding the results that may be obtained from the use of content or services, the accuracy or reliability of any content obtained through the Services, any goods or services purchased or obtained through the Website, and makes no warranty that the services will meet your requirements, be uninterrupted, timely, secure or error-free. No advice or information, whether oral or written, obtained by you from the Website shall create any warranty.
                    </p>
                    <p>
                        The services may consist of the following, without limitation: Astrological content, Reports, Tarot readings, fortunes, numerology, and predictions, through Ko-sychic. Ko-sychic charges for the chat service offered on this platform on per minute basis and holds no responsibility or liability about the reality or reliability of the astrological effects on the human physiology, by the gems, any other products or services represented and sold on the website. No advice or information, whether oral or written, obtained by you shall create any warranty.
                    </p>
                    <p>
                        The advisors/consultants/astrologers are also members of the site and not employees of the Website or the company. However, the Website verifies the degrees, qualifications, credentials, and background of the advisors/consultants/astrologers but does not refer, endorse, recommend, verify, evaluate or guarantee any advice, information or other services provided by the advisors/consultants/astrologers or by the company, nor does it warrant the validity, accuracy, completeness, safety, legality, quality, or applicability of the content, anything said or written by, or any advice provided by the advisors/consultants/astrologers.
                    </p>
                    <p>
                        The website is not a suicide helpline platform. If you are considering or contemplating suicide or feel that you are a danger to yourself or to others, you may discontinue use of the services immediately at your discretion and please notify appropriate police or emergency medical personnel. If you are thinking about suicide, immediately call a suicide prevention helpline such as AASRA (91-22-27546669).
                    </p>
                    <p>
                        The Website shall not be liable for any inaccuracy, error or delay in, or omission of (a) any data, information or message, or (b) the transmission or delivery of any such data, information or message; or (c) any loss or damage arising from or occasioned by any such inaccuracy, error, delay or omission, non-performance or interruption in any such data, information or message. Under no circumstances shall the Website and/or the payment service providers, its employees, directors, and its third party agents involved in processing, delivering or managing the services, be liable for any direct, indirect, incidental, special or consequential damages, or any damages whatsoever, including punitive or exemplary arising out of or in any way connected with the provision of or any inadequacy or deficiency in the provision of the services or resulting from unauthorized access or alteration of transmissions of data or arising from suspension or termination of the services.
                    </p>
                    <p>
                        Notwithstanding anything to the contrary contained herein, Ko-sychic liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to the Website, for the service during the term of membership.
                    </p>
                    <h4>Indemnification</h4>
                    <p>
                        The User shall indemnify, defend and hold harmless the Website and its parent, subsidiaries, affiliates, officers, directors, employees, suppliers, consultants and agents from any and all third party claims, liability, damages and/or costs (including, but not limited to, attorney’s fees) arising from Your use of the Services, Your violation of the Privacy Policy or these Terms of Service, or Your violation of any third party's rights, including without limitation, infringement by You or any other user of Your account of any intellectual property or other right of any person or entity. These Terms of Service will inure to the benefit of Website’s successors, assigns, and licensees.
                    </p>
                    <h4>Proprietary Rights to Content</h4>
                    <p>
                        The User acknowledges that the Content, including but not limited to text, software, music, sound, photographs, video, graphics or other material contained in sponsor advertisements or distributed via email, commercially produced information presented to Member by the Website, its suppliers, and/or advertisers, is protected by copyrights, trademarks, service marks, patents and/or other proprietary rights and laws. The User is not permitted to copy, use, reproduce, distribute, perform, display, or create derivative works from the Content unless expressly authorized by the Website, its suppliers, or advertisers. Moreover, the content such as images, text, designs, etc on all of the portals of the Website are taken from various online portals such as Google Images. Ko-sychic is not liable for any copyrights of that content or data.
                    </p>
                    <h4>Restricted Content</h4>
                    <h4>Child Endangerment</h4>
                    <p>
                        Our App prohibits users from creating, uploading, or distributing content that facilitates the exploitation or abuse of children will be subject to immediate deletion of the account. This includes all child sexual abuse materials. To report content on the Ko-sychic App that may exploit a child,
                    </p>
                    <p>
                        We prohibit the use of Ko-sychic app to endanger children. This includes but is not limited to use of apps to promote predatory behaviour towards children, such as:
                    </p>
                    <ul>
                        <li>Inappropriate interaction targeted at a child (for example, groping or caressing).</li>
                        <li>Child grooming (for example, befriending a child online to facilitate, either online or offline, sexual contact and/or exchanging sexual imagery with that child).</li>
                        <li>Sexualization of a minor (for example, imagery that depicts, encourages or promotes the sexual abuse of children or the portrayal of children in a manner that could result in the sexual exploitation of children).</li>
                        <li>Sextortion (for example, threatening or blackmailing a child by using real or alleged access to a child’s intimate images).</li>
                        <li>Trafficking of a child (for example, advertising or solicitation of a child for commercial sexual exploitation).</li>
                    </ul>
                    <p>
                        We will take appropriate action, if we become aware of content with child sexual abuse materials.
                    </p>
                    <p>
                        In addition, content that appeal to children but contain adult themes are strictly prohibited, including but not limited to:
                    </p>
                    <ul>
                        <li>Content with excessive violence, blood, and gore.</li>
                        <li>Content that depict or encourage harmful and dangerous activities.</li>
                        <li>Apps that promote negative body or self-image, including those depicting plastic surgery, weight loss, and other cosmetic adjustments.</li>
                    </ul>
                    <h4>Inappropriate Content</h4>
                    <p>
                        To ensure that Our App remains a safe and respectful platform, we've created standards defining and prohibiting content that is harmful or inappropriate for our users.
                    </p>
                    <h4>Sexual Content and Profanity</h4>
                    <p>
                        We don't allow accounts that contain or promote sexual content or profanity, including pornography, or any content or services intended to be sexually gratifying. We don’t allow app content that appear to promote or solicit a sexual act in exchange for compensation. We don’t allow content that contain or promote content associated with sexually predatory behaviour, or distribute non-consensual sexual content.
                    </p>
                    <p>If an account contains content that violates this policy it gives the absolute right to the owner to delete the account with immediate effect.</p>

                    <h4>Common Violations:</h4>

                    <h4>Sexually Explicit Content:</h4>
                    <ul>
                        <li>Depictions of sexual nudity, or sexually suggestive poses in which the subject is nude, blurred or minimally clothed, and/or where the clothing would not be acceptable in an appropriate public context.</li>
                        <li>Depictions, animations or illustrations of sex acts, or sexually suggestive poses or the sexual depiction of body parts.</li>
                        <li>Content that depicts or are functionally sexual aids, sex guides, illegal sexual themes and fetishes.</li>
                        <li>Content that is lewd or profane – including but not limited to content which may contain profanity, slurs, explicit text, or adult/sexual keywords in the store listing or in-app.</li>
                        <li>Content that depicts, describes, or encourages bestiality.</li>
                        <li>Content that promotes sex-related entertainment, escort services, or other services that may be interpreted as providing or soliciting sexual acts in exchange for compensation, including, but not limited to compensated dating or sexual arrangements where one participant is expected or implied to provide money, gifts, or financial support to another participant ("sugar dating").</li>
                        <li>Content that degrades or objectifies people, such as apps that claim to undress people or see through clothing, even if labelled as prank or entertainment apps.</li>
                        <li>Content or behavior that attempts to threaten or exploit people in a sexual manner, such as creepshots, hidden camera, non-consensual sexual content created via deepfake or similar technology, or assault content.</li>
                    </ul>

                    <h4>Hate Speech:</h4>
                    <ul>
                        <li>Content or speech asserting that a protected group is inhuman, inferior or worthy of being hated.</li>
                        <li>Content that is hateful slurs, stereotypes, or theories about a protected group possessing negative characteristics (for example, malicious, corrupt, evil, etc.), or explicitly or implicitly claims the group is a threat.</li>
                        <li>Content or speech trying to encourage others to believe that people should be hated or discriminated against because they are a member of a protected group.</li>
                        <li>Content which promotes hate symbols such as flags, symbols, insignias, paraphernalia or behaviors associated with hate groups.</li>
                    </ul>

                    <h4>Violence:</h4>
                    <ul>
                        <li>Graphic depictions or descriptions of realistic violence or violent threats to any person or animal.</li>
                        <li>Content that promotes self-harm, suicide, eating disorders, choking games or other acts where serious injury or death may result.</li>
                    </ul>

                    <h4>Terrorist Content:</h4>
                    <ul>
                        <li>We do not permit terrorist organizations to publish content for any purpose, including recruitment.</li>
                        <li>We don't allow users with content related to terrorism, such as content that promotes terrorist acts, incites violence, or celebrates terrorist attacks.</li>
                    </ul>

                    <h4>Dangerous Organizations and Movements:</h4>
                    <ul>
                        <li>We do not permit movements or organizations that have engaged in, prepared for, or claimed responsibility for acts of violence against civilians to publish content for any purpose, including recruitment.</li>
                        <li>We don’t allow users with content related to planning, preparing, or glorifying violence against civilians.</li>
                    </ul>

                    <h4>Sensitive Events:</h4>
                    <ul>
                        <li>Lacking sensitivity regarding the death of a real person or group of people due to suicide, overdose, natural causes, etc.</li>
                        <li>Denying the occurrence of a well-documented, major tragic event.</li>
                        <li>Appearing to profit from a sensitive event with no discernible benefit to the victims.</li>
                    </ul>

                    <h4>Bullying and Harassment:</h4>
                    <ul>
                        <li>Bullying victims of international or religious conflicts.</li>
                        <li>Content that seeks to exploit others, including extortion, blackmail, etc.</li>
                        <li>Posting content in order to humiliate someone publicly.</li>
                        <li>Harassing victims, or their friends and families, of a tragic event.</li>
                        <li>Posting content in order to humiliate someone publicly</li>
                        <li>Harassing victims, or their friends and families, of a tragic event.</li>



                    </ul>
                    <h4>Dangerous Products</h4>
                    <p>We don't allow users that facilitate the sale of explosives, firearms, ammunition, or certain firearms accessories. We also prohibit users from providing instructions for the manufacture of explosives, firearms, ammunition, restricted firearm accessories, or other weapons. This includes instructions on how to convert a firearm to automatic, or simulated automatic, firing capabilities.</p>
                    <p>We don't allow users that facilitate the sale of marijuana or marijuana products, regardless of legality. Additionally, users are prohibited from facilitating the sale of tobacco (including e-cigarettes and vape pens) or encouraging the illegal or inappropriate use of alcohol or tobacco. Psychotropic drugs and drugs falling under the restricted category of Drugs and Cosmetics Act and Rules 1945 are also not allowed.</p>
                    <p>Black Magic, Witchcraft, Voodoo, and Tantrism are strictly prohibited on our platform. If a user is found to be engaged in any such activity, whether intentionally or unintentionally, we reserve the right to delete the account.</p>

                    <h4>Ko-sychic Services</h4>
                    <p>These Terms of Service apply to all users of Ko-sychic. Information provided by users through the Ko-sychic Service may contain links to third-party websites that are not owned or controlled by Ko-sychic. Ko-sychic assumes no responsibility for the content, privacy policies, or practices of any third-party websites. Users understand that Ko-sychic will not and cannot censor or edit the content of any users and third-party site. By using the Service, users acknowledge and agree that Ko-sychic shall not be responsible for any damages, claims, or other liability arising from or related to the use of any content and third-party website.</p>
                    <p>We do not represent or warrant that the Ko-sychic Site will be error-free, free of viruses or other harmful components, or that defects will be corrected. We may make changes to the features, functionality, or content of the Ko-sychic at any time. Ko-sychic reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Services and/or Sites (or any part thereof) with or without notice.</p>

                    <h4>Free Coins</h4>
                    <p>If you check in on a daily basis, you will receive free coins, and if you keep this streak, you will receive bonus coins; but, if you do not maintain this daily log-in streak you will have to restart from the beginning.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TermAndCondition
