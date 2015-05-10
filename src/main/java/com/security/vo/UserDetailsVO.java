package com.security.vo;

import java.io.Serializable;
import java.util.List;

public class UserDetailsVO implements Serializable {
    /**
	 *
	 */
	private static final long serialVersionUID = 1454167610283345783L;


    private String userId;
    private String passWord;
    private String userName;
    private String roleId;
    private String svcTgtGroupId;
    private String userClasCd;
    private Long svcTgtSeq;
    private Long mbrSeq;
    private List<MenuVo> menuList;
    private String userTypeCd;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getSvcTgtGroupId() {
		return svcTgtGroupId;
	}

	public void setSvcTgtGroupId(String svcTgtGroupId) {
		this.svcTgtGroupId = svcTgtGroupId;
	}

	public List<MenuVo> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<MenuVo> menuList) {
		this.menuList = menuList;
	}

	public String getUserClasCd() {
		return userClasCd;
	}

	public void setUserClasCd(String userClasCd) {
		this.userClasCd = userClasCd;
	}

	/**
	 * @return the svcTgtSeq
	 */
	public Long getSvcTgtSeq() {
		return svcTgtSeq;
	}

	/**
	 * @param svcTgtSeq the svcTgtSeq to set
	 */
	public void setSvcTgtSeq(Long svcTgtSeq) {
		this.svcTgtSeq = svcTgtSeq;
	}

	/**
	 * @return the mbrSeq
	 */
	public Long getMbrSeq() {
		return mbrSeq;
	}

	/**
	 * @param mbrSeq the mbrSeq to set
	 */
	public void setMbrSeq(Long mbrSeq) {
		this.mbrSeq = mbrSeq;
	}

	/**
	 * @return the userTypeCd
	 */
	public String getUserTypeCd() {
		return userTypeCd;
	}

	/**
	 * @param userTypeCd the userTypeCd to set
	 */
	public void setUserTypeCd(String userTypeCd) {
		this.userTypeCd = userTypeCd;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "UserDetailsVO [userId=" + userId + ", passWord=" + passWord
				+ ", userName=" + userName + ", roleId=" + roleId
				+ ", svcTgtGroupId=" + svcTgtGroupId + ", userClasCd="
				+ userClasCd + ", svcTgtSeq=" + svcTgtSeq + ", mbrSeq="
				+ mbrSeq + ", menuList=" + menuList + ", userTypeCd="
				+ userTypeCd + "]";
	}

}
