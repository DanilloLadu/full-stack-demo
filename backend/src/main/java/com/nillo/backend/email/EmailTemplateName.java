package com.nillo.backend.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    NEW_PASSWORD("new_password");

    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}
