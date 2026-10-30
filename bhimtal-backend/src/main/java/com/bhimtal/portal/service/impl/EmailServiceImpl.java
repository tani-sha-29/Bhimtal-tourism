package com.bhimtal.portal.service.impl;

import com.bhimtal.portal.model.Inquiry;
import com.bhimtal.portal.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.notification-recipient:admin@bhimtaltravel.com}")
    private String adminEmail;

    @Value("${app.mail.sender:noreply@bhimtaltravel.com}")
    private String senderEmail;

    @Override
    @Async
    public void sendInquiryNotification(Inquiry inquiry) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(adminEmail);
            message.setSubject("New Bhimtal Portal Inquiry from " + inquiry.getUserName());

            String body = String.format(
                    "Hello Team,\n\n" +
                    "A new inquiry has been received on Bhimtal Travel Portal:\n\n" +
                    "Inquiry ID: %d\n" +
                    "User Name: %s\n" +
                    "User Email: %s\n" +
                    "User Phone: %s\n" +
                    "Listing Type: %s\n" +
                    "Listing ID: %s\n" +
                    "Date: %s\n\n" +
                    "Message:\n%s\n\n" +
                    "Best regards,\nBhimtal Travel Platform",
                    inquiry.getId(),
                    inquiry.getUserName(),
                    inquiry.getUserEmail(),
                    inquiry.getUserPhone() != null ? inquiry.getUserPhone() : "N/A",
                    inquiry.getListingType() != null ? inquiry.getListingType() : "General",
                    inquiry.getListingId() != null ? inquiry.getListingId().toString() : "N/A",
                    inquiry.getCreatedDate(),
                    inquiry.getMessage()
            );

            message.setText(body);
            mailSender.send(message);
            log.info("Sent inquiry notification email to admin {} for inquiry ID {}", adminEmail, inquiry.getId());
        } catch (Exception e) {
            log.warn("Could not dispatch admin inquiry email notification (SMTP might not be configured): {}", e.getMessage());
        }
    }

    @Override
    @Async
    public void sendInquiryConfirmation(Inquiry inquiry) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(inquiry.getUserEmail());
            message.setSubject("Thank you for your Bhimtal inquiry!");

            String body = String.format(
                    "Dear %s,\n\n" +
                    "Thank you for contacting us about your Bhimtal travel plans!\n\n" +
                    "We have received your message regarding %s:\n" +
                    "\"%s\"\n\n" +
                    "Our local Bhimtal team is reviewing your inquiry and will reach out to you shortly.\n\n" +
                    "Warm regards,\n" +
                    "Bhimtal Local Travel & Tourism Team",
                    inquiry.getUserName(),
                    inquiry.getListingType() != null ? inquiry.getListingType() : "travel inquiry",
                    inquiry.getMessage()
            );

            message.setText(body);
            mailSender.send(message);
            log.info("Sent confirmation email to traveler {} for inquiry ID {}", inquiry.getUserEmail(), inquiry.getId());
        } catch (Exception e) {
            log.warn("Could not dispatch user confirmation email (SMTP might not be configured): {}", e.getMessage());
        }
    }
}
