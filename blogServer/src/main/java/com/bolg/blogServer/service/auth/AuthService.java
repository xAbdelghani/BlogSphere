package com.bolg.blogServer.service.auth;

import com.bolg.blogServer.dto.SignupRequest;
import com.bolg.blogServer.dto.UserDTO;

public interface AuthService {

     UserDTO createUser(SignupRequest signupRequest) throws Exception;

     Boolean hasUserWithEmail(String email);

     void forgotPassword(String email);

     void resetPassword(String token, String newPassword);

}
