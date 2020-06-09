package com.bitacademy.vo;


public class MemberModifyRequest {
    
    private String id;
    private String previousPassword;
    private String newPassword;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getPreviousPassword() {
        return previousPassword;
    }
    public void setPreviousPassword(String previousPassword) {
        this.previousPassword = previousPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    

}