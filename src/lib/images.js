// Single source of truth for local imagery, keyed by item id.
// Content (text/stats) lives in the DB; images stay as Vite-optimized local
// assets and are attached to records by id in the data API layer.
import joker from "../assets/joker.webp";
import bane from "../assets/bane.webp";
import catwoman from "../assets/catwoman.webp";
import deathstroke from "../assets/deathstroke.webp";
import harley from "../assets/harley-quinn.webp";
import redhood from "../assets/red-hood.webp";
import freeze from "../assets/mr-freeze.webp";
import ivy from "../assets/poison-ivy.webp";
import scarecrow from "../assets/scarecrow.webp";
import riddler from "../assets/the-riddler.webp";
import twoface from "../assets/two-face.webp";
import penguin from "../assets/the-penguin.webp";
import croc from "../assets/killer-croc.webp";

import nightwing from "../assets/nightwing.webp";
import oracle from "../assets/oracle.webp";
import robin from "../assets/robin.webp";
import redRobin from "../assets/red-robin.webp";
import batgirl from "../assets/batgirl.webp";
import alfred from "../assets/alfred.webp";

import suitClassic from "../assets/suit-classic.webp";
import suitDarkKnight from "../assets/suit-dark-knight.webp";
import suitTheBatman from "../assets/suit-the-batman.webp";

import vehBatmobile from "../assets/veh-batmobile.webp";
import vehBatwing from "../assets/veh-batwing.webp";
import vehBatpod from "../assets/veh-batpod.webp";

export const rogueImages = {
  joker, bane, catwoman, deathstroke, harley, redhood,
  freeze, ivy, scarecrow, riddler, "two-face": twoface, penguin, "killer-croc": croc,
};

export const allyImages = {
  nightwing, oracle, robin, "red-robin": redRobin, batgirl, alfred,
};

export const suitImages = {
  classic: suitClassic, "dark-knight": suitDarkKnight, "the-batman": suitTheBatman,
};

export const vehicleImages = {
  batmobile: vehBatmobile, batwing: vehBatwing, batpod: vehBatpod,
};
