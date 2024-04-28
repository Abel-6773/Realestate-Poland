import { useParams, useNavigate, NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Loading from "../Components/UI/Loading";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import shareIcon from "../assets/svg/shareIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

export default function SingleListingPage() {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [landLord, setLandLord] = useState(null);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", `${params.listingID}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      } else {
        console.log("No such document!");
      }

      const landLordRef = doc(db, "users", `${docSnap.data().userRef}`);
      const landLordSnap = await getDoc(landLordRef);
      if (landLordSnap.exists()) {
        setLandLord(landLordSnap.data());
      } else {
        console.log("Couldn't find landlord");
      }
      setLoading(false);
    };
    getListing();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && landLord ? (
          <a
            href={`mailto:${landLord.email}?subject=Inquiry About ${listing.name} Listing`}
            className="primaryButton"
          >
            Contact Landlord
          </a>
        ) : (
          <p className="listingLocationTitle">
            No landloard found for this listing
          </p>
        )}
      </div>
    </main>
  );
}
