const mongoose = require('mongoose');

const vacationSchema = mongoose.Schema({
  name: String,
  slug: String,
  category: String,
  sku: String,
  description: String,
  location: {
    search: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: Number,
  tags: [String],
  inSeason: Boolean,
  available: Boolean,
  requiresWaiver: Boolean,
  maximumGuests: Number,
  notes: String,
  packagesSold: Number,
});

// Vacation is very much like a class in traditional object-oriented programming.
const Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
