import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Loading from "../Components/UI/Loading";
import ListingItem from "../Components/Category/ListingItem";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get reference
        const listingRef = collection(db, "listings");

        //create query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //execute query
        const querySnap = await getDocs(q);

        const listings = [];
        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header className="pageHeader">
        <p>
          {params.categoryName == "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      <main>
        {loading ? (
          <Loading />
        ) : listings && listings.length > 0 ? (
          listings.map((listing) => {
            return (
              <ListingItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            );
          })
        ) : (
          <p>There are currently no listing for {params.categoryName}</p>
        )}
      </main>
    </div>
  );
}
