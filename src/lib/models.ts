import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true, lowercase: true, index: true },
  image: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  password: { type: String },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  coverImage: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

export const Event = models.Event || model('Event', EventSchema);

const PublicationSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String }],
  abstract: { type: String },
  link: { type: String },
  publishedAt: { type: Date },
  journal: { type: String },
  coverImage: { type: String }
}, { timestamps: true });

export const Publication = models.Publication || model('Publication', PublicationSchema);

const MerchandiseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }],
  sizes: [{ type: String }],
  stock: { type: Number, default: 0 }
}, { timestamps: true });

export const Merchandise = models.Merchandise || model('Merchandise', MerchandiseSchema);
