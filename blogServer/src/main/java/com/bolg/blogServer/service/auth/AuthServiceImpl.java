package com.bolg.blogServer.service.auth;

import com.bolg.blogServer.dto.SignupRequest;
import com.bolg.blogServer.dto.UserDTO;
import com.bolg.blogServer.entity.PasswordResetToken;
import com.bolg.blogServer.entity.User;
import com.bolg.blogServer.enums.UserRole;
import com.bolg.blogServer.repository.PasswordResetTokenRepository;
import com.bolg.blogServer.repository.UserRepository;
import com.bolg.blogServer.service.email.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final EmailService emailService;

    @Transactional
    public UserDTO createUser(SignupRequest signupRequest) throws Exception {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.USER);
        User createdUser = userRepository.save(user);
        return createdUser.getUserDto();
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Transactional
    public void forgotPassword(String email) {
        Optional<User> optionalUser = userRepository.findFirstByEmail(email);
        if (optionalUser.isEmpty()) {
            // Do not reveal whether an account exists for this email
            return;
        }
        User user = optionalUser.get();

        // Remove any existing tokens for this user
        passwordResetTokenRepository.deleteByUser(user);

        // Create a new token valid for 30 minutes
        String tokenValue = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(tokenValue);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30));
        passwordResetTokenRepository.save(resetToken);

        // Send the reset email
        String resetLink = "http://localhost:4200/reset-password?token=" + tokenValue;
        String subject = "Password Reset Request";
        String body = "Hello " + user.getName() + ",\n\n"
                + "We received a request to reset your password. Click the link below to set a new password:\n\n"
                + resetLink + "\n\n"
                + "This link will expire in 30 minutes.\n\n"
                + "If you did not request a password reset, please ignore this email.\n\n"
                + "– The Blog Team";
        emailService.sendEmail(user.getEmail(), subject, body);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token expired or invalid"));

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Token expired or invalid");
        }

        User user = resetToken.getUser();
        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        userRepository.save(user);

        // Invalidate the token after use
        passwordResetTokenRepository.delete(resetToken);
    }
}
