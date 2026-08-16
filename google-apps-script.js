let sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1TdbmOVWeqqwkur_E60k1l7klb-vLhqP3IDEgB8Wr00c/edit');

function doPost(e) {
    if (!e || !e.parameter) {
        return ContentService.createTextOutput("Error: No form data received.");
    }

    let data = e.parameter;

    // The form on index.html sends: name, email, phone, order_number, subject, message
    let sheetName = sheet.getSheetByName("Contact Submissions");

    if (!sheetName) {
        sheetName = sheet.insertSheet("Contact Submissions");

        // Append headers
        sheetName.appendRow([
            "Timestamp", "Name", "Email", "Phone", "Order Number", "Subject", "Message"
        ]);
    }

    // Save form data
    sheetName.appendRow([
        new Date(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.order_number || "",
        data.subject || "",
        data.message || ""
    ]);

    // =========================
    // Email Notification Logic
    // =========================

    var recipients = ["enter.aleph@gmail.com", "devyasir001@gmail.com"];

    // Email Subject and Body
    var subject = "New Contact Form Submission: " + (data.subject || "No Subject");
    var message = "A new contact form submission has been received.\n\n";
    message += "Name: " + (data.name || "N/A") + "\n";
    message += "Email: " + (data.email || "N/A") + "\n";
    message += "Phone: " + (data.phone || "N/A") + "\n";
    message += "Order Number: " + (data.order_number || "N/A") + "\n";
    message += "Subject: " + (data.subject || "N/A") + "\n";
    message += "Message: \n" + (data.message || "N/A") + "\n";
    message += "\nYou can check more details in the Google Sheet.";

    // Send Email Notification
    for (var i = 0; i < recipients.length; i++) {
        MailApp.sendEmail(recipients[i], subject, message);
    }

    // Return a JSON response for AJAX
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "data": "Data Saved Successfully" }))
        .setMimeType(ContentService.MimeType.JSON);
}
