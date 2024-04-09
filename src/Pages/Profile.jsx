import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  // console.log(auth.currentUser);
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== user.name) {
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: user.name,
        });

        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: user.name,
        });
      }
    } catch (error) {
      toast.error("error");
    }
  };
  const onChange = (e) => {
    setUser((c) => {
      return { ...c, [e.target.id]: e.target.value };
    });
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <h1 className="pageHeader">My Profile</h1>
        <button type="button" className="logOut" onClick={logout}>
          Logout
        </button>
      </header>
      <main>
        <section>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((c) => !c);
              }}
            >
              {changeDetails ? "Done" : "Change"}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={changeDetails ? "profileNameActive" : "profileName"}
                disabled={!changeDetails}
                value={user.name}
                onChange={onChange}
              />
              <input
                type="text"
                id="emal"
                className={
                  changeDetails ? "profileEmailActive" : "profileEmail"
                }
                disabled={!changeDetails}
                value={user.email}
                onChange={onChange}
              />
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
