import sinon from "sinon";
import { expect } from "chai";
import request from "supertest";
import app from "../index.js";

global.expect = expect;
global.request = request;
global.sinon = sinon;
global.app = app;
