# Common attacks and give some suggestions to prevent them

### 1. COMPROMISES DATABASE (co so du lieu bi xam pham)
- meaning: that an attacker gained access to our database. Of course , this is an extremely severe problem
- **solution**
    + Always encrypt passwords and password reset tokens (password reset tokens for feature forgot password)
    => This way, the attacker can not at least steal our user's passwords and also can't reset them
       (*bằng cách này, kẻ tấn công ít nhất không thể đánh cắp mật khẩu người dùng và không thể reset chúng*)

### 2. BRUTE FORCE ATTACKS
- meaning: where the attacker basically tries to guess a password by trying milions and milions of random passwords
until they find the right one
(*Nơi kẻ tấn công về cơ bản là cố gắng đoán mật khẩu bằng cách thử hàng triệu mật khẩu random cho đến khi họ tìm thấy 1 cái đúng*)

- **solution**
    + We can do is to make the login request really slow by using the ***bcrypt package***
    + Another strategy is to implement rate limiting which limits the number of requests coming form one single IP address
    + specify a maximum number of login attempts for each user (after 10 failed login attempts, user would have to wait one hour until he can try again)

### 3. CROSS-SITE SCRIPING (XSS) ATTACKS
-meaning : Where the attacker tries to inject script into our page to run his malicious code. On the client side, this is especially dangerous because it allows the attacker to read the local storage (*which is the reason why we should't store the JSON web token in local storage. Instead, it should be stored in an HTTP-only cookie that makes the browser can only receive and send the cookie but can not access or modify it in any way*)

- Now, on the backend side, in order to prevent XSS attacks, we should do the following
- **solution**
    + Store JWT in HTTPOnly cookies
    + Sanitize user input data
    + Set special HTTP headers (helmet package)
which make these attacks a bit more difficult to happen (*dieu nay lam cho cac cuoc tan cong kho xay ra hon mot chut*)

### 4. DENIAL-OF-SERVICE (DOS) ATTACKS
-meaning : it happens when attacker sends so many requests to a server that it breaks down and the application becomes unavaiable

- **solution**
    + Implement rate limiting (express-rate-limit)
    + Limit body payload (in body-parser)
    + Avoid using evil regular expressions 

### 5. NOSQL QUERY INJECTION
- meaning : Query injection happens when an attacker. Instead of inputing valid date, he injects some query in order to create query expressions that gonna translate to `true`

- **solution**
    + Use mongoose for MongoDB (because of SchemaTypes)
    + Sanitize user input data

## OTHER BEST PRACTICE AND SUGGESTIONS
- Always use HTTPS
=> in a production application all communication between server and client needs to happen over HTTPS
otherwise, anyone can listen into the conversation and steal out JSON web token

- Always create random password reset token with expiry date
- Deny access to JWT after password change
- Don't commit sensitive config data to git
- Don't send error detail to clients

- Prevent Cross-Site Request Forgery (using csurl package)
==> which is an attack that forces a user to execute unwanted actions on a web application
(*là một cuộc tấn công buộc người dùng thực hiện các hành động không mong muốn trên một ứng dụng web*)

- Require re-authentication before a high-value action such as deleting and creating a document
(*xác thực lại trước khi thực hiện hanh động quan trọng*)

- Implement a backlist of unstrusted JWT
- Confirm user email address after first creating account
- Keep user loged in with aa refresh tokens
- Implement two factor authentication
- Prevent parameter pollution causing Uncaught Exceptions