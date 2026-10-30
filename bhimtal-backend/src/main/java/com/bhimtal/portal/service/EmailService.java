package com.bhimtal.portal.service;

import com.bhimtal.portal.model.Inquiry;

public interface EmailService {

    void sendInquiryNotification(Inquiry inquiry);

    void sendInquiryConfirmation(Inquiry inquiry);
}
