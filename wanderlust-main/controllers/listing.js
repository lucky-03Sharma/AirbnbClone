const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    req.flash("error", "Error loading listings. Please try again.");
    res.render("listings/index", { allListings: [] });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      req.flash("error", "Please upload an image for the listing");
      return res.redirect("/listings/new");
    }

    // Geocode the location
    let response;
    try {
      response = await geocodingClient
        .forwardGeocode({
          query: req.body.listing.location,
          limit: 1,
        })
        .send();
    } catch (geocodeError) {
      console.error("Geocoding error:", geocodeError);
      req.flash("error", "Error geocoding location. Please try again.");
      return res.redirect("/listings/new");
    }

    // Check if geocoding returned results
    if (!response.body.features || response.body.features.length === 0) {
      req.flash("error", "Could not find location. Please enter a valid location.");
      return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    req.flash("error", "Error creating listing. Please try again.");
    res.redirect("/listings/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exists!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Check if location has changed
    const oldLocation = listing.location;
    const newLocation = req.body.listing.location;
    
    // Update basic fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.country = req.body.listing.country;
    listing.location = newLocation;

    // If location changed, update geometry
    if (oldLocation !== newLocation) {
      try {
        let response = await geocodingClient
          .forwardGeocode({
            query: newLocation,
            limit: 1,
          })
          .send();
        
        if (response.body.features && response.body.features.length > 0) {
          listing.geometry = response.body.features[0].geometry;
        } else {
          req.flash("error", "Could not geocode new location. Map may not update correctly.");
        }
      } catch (geocodeError) {
        console.error("Geocoding error:", geocodeError);
        req.flash("error", "Error geocoding location. Listing updated but map may not reflect new location.");
      }
    }

    // Update image if new file uploaded
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "Error updating listing. Please try again.");
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};