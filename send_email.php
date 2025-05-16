<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set recipient email (change to your actual email)
    $to = "info@mabiriziemmanuel.com";
    
    // Set email subject
    $subject = "New Wells Project Registration";
    
    // Collect form data
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $region = $_POST['region'];
    $village = $_POST['village'];
    $currentSource = $_POST['currentSource'];
    $healthIssues = $_POST['healthIssues'];
    $additionalInfo = $_POST['additionalInfo'];
    $communityCommitment = $_POST['communityCommitment'];
    
    // Create email message
    $message = "
    <html>
    <head>
        <title>New Wells Project Registration</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .header { color: #2c7be5; font-size: 18px; font-weight: bold; }
            .label { font-weight: bold; }
            .section { margin-bottom: 20px; border-left: 3px solid #2c7be5; padding-left: 10px; }
        </style>
    </head>
    <body>
        <div class='header'>New Wells Project Registration</div>
        
        <div class='section'>
            <div class='label'>Contact Information:</div>
            <div>Name: $fullName</div>
            <div>Email: $email</div>
            <div>Phone: $phone</div>
        </div>
        
        <div class='section'>
            <div class='label'>Location:</div>
            <div>Sub-County: $region</div>
            <div>Village/Town: $village</div>
        </div>
        
        <div class='section'>
            <div class='label'>Water Needs:</div>
            <div>Current Water Source: $currentSource</div>
            <div>Water-related Health Issues: $healthIssues</div>
            <div>Additional Info: $additionalInfo</div>
        </div>
        
        <div class='section'>
            <div class='label'>Community Commitment:</div>
            <div>Willing to maintain well: $communityCommitment</div>
        </div>
    </body>
    </html>
    ";
    
    // Set email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: wells-project@yourdomain.com" . "\r\n";
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect back with success parameter
        header("Location: ".$_SERVER['HTTP_REFERER']."?success=1");
    } else {
        // Redirect back with error parameter
        header("Location: ".$_SERVER['HTTP_REFERER']."?error=1");
    }
    
    exit();
}
?>