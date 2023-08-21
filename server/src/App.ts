import HTTPConnection from "./connections/HTTP";
import WSConnection from "./connections/WS";
import DBConnection from "./connections/DB";
import AuthComponent from "./components/auth.component";
import UserComponent from "./components/user.component";
import SearchComponent from "./components/search.component";
import ChannelComponent from "./components/channel.component";
import MediaComponent from "./components/media.component";
import PostComponent from "./components/post.component";
import MessageComponent from "./components/message.component";

export const HTTP = (() => {
  const HTTP = new HTTPConnection(4000);
  HTTP.connect();
  return HTTP;
})();

export const WS = (() => {
  const WS = new WSConnection(HTTP.app);
  const aWSS = WS.aWSS;
  return { WS, aWSS };
})();

export const DB = (() => {
  const database = new DBConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "M",
  });
  database.connect();
  return database;
})();

export const app = HTTP.app;

export const App = (): void => {
  console.clear();
  AuthComponent();
  UserComponent();
  SearchComponent();
  ChannelComponent();
  MediaComponent();
  PostComponent();
  MessageComponent();
};
