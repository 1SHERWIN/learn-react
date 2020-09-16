package com.jpmc.perotMuseumScavengerHunt.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class User {

    private String nickname;
    private String name;
    private boolean checkpoint_1;
    private boolean checkpoint_2;
    private boolean checkpoint_3;
    private boolean checkpoint_4;
    private boolean checkpoint_5;
    private boolean completionStatus;
    private String email;

    public User() {
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getCheckpoint1() {
        return this.checkpoint_1;
    }

    public void setCheckpoint1(boolean checkpoint_1) {
        this.checkpoint_1 = checkpoint_1;
    }

    public boolean getCheckpoint2() {
        return this.checkpoint_2;
    }

    public void setCheckpoint2(boolean checkpoint_2) {
        this.checkpoint_2 = checkpoint_2;
    }

    public boolean getCheckpoint3() {
        return this.checkpoint_3;
    }

    public void setCheckpoint3(boolean checkpoint_3) {
        this.checkpoint_3 = checkpoint_3;
    }

    public boolean getCheckpoint4() {
        return this.checkpoint_4;
    }

    public void setCheckpoint4(boolean checkpoint_4) {
        this.checkpoint_4 = checkpoint_4;
    }

    public boolean getCheckpoint5() {
        return this.checkpoint_5;
    }

    public void setCheckpoint5(boolean checkpoint_5) {
        this.checkpoint_5 = checkpoint_5;
    }

    public boolean getCompletionStatus() {
        return this.completionStatus;
    }

    public void setCompletionStatus(boolean completionStatus) {
        this.completionStatus = completionStatus;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString () {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

}
