import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";

const Header = ({ userInfo, setUserInfo }) => {
    const navigate = useNavigate();
    const [showAvtDropdown, setShowAvtDropdown] = useState(false);
    const [searchField, setSearchField] = useState("");

    const showAvatarDropdown = () => {
        setShowAvtDropdown(!showAvtDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".avt-dropdown-btn")) {
                setShowAvtDropdown(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const logOut = () => {
        // fetch("http://localhost:1234/api/v1/user/account/logout", {
        //     credentials: "include",
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         if (json.message === "Logout successful") {
        //             setUserInfo(null);
        //             navigate("/");
        //         }
        //     });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchField.trim()) {
            navigate(`/brand/search/${searchField}`);
        }
    };

    const handleSearchClick = () => {
        if (searchField.trim()) {
            navigate(`/brand/search/${searchField}`);
        }
    };

    return (
        <header>
            <Link to="/brand" className="logo">
                BRAND
            </Link>
            <nav className="brand-nav">
                <Link to="/brand">Events</Link>
                <Link to="/brand/reports">Reports</Link>
            </nav>
            <div className="search-box">
                <input
                    type="text"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    className="search-input"
                    placeholder="Search..."
                    onKeyDown={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {userInfo ? (
                <>
                    <div
                        className="avt-dropdown-btn"
                        style={{ backgroundImage: `url(${userInfo.Image_Avatar})` }}
                        onClick={showAvatarDropdown}
                    >
                        {showAvtDropdown && (
                            <div className="dropdown-menu" id="avt-dropdown">
                                <Link to="/brand-info">Profile</Link>
                                <hr />
                                <Link onClick={logOut}>
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="profile-ico"
                                    />
                                    Sign out
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Link to="/authentication/login" className="head-login-btn">
                    LOGIN
                    <FontAwesomeIcon icon={faRightToBracket} className="head-login-ico" />
                </Link>
            )}
        </header>
    );
};

export default Header;
