<?php
// Check if form is submitted
if(isset($_POST['submit'])) {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Email content setup (replace with your email address)
    $to = "your_email@example.com";
    $subject = "Contact Form Submission - $subject";
    $body = "Name: $name \nEmail: $email \nMessage: $message";
    $headers = "From: $email \r\n";

    // Send email using mail function
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "Error sending message.";
    }
}
?>

<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" role="form" class="contactForm">
    <div class="text-center"><button type="submit" name="submit">Send Message</button></div>
</form>
