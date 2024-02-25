import React, { useEffect } from 'react';
import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncAddTalk, asyncToggleLikeTalk } from '../states/talks/action';

function HomePage() {
  const {
    talks = [],
    users = [],
    authUser,
  } = useSelector((states) => states); // @TODO: get talks, users, and authUser state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to populate talks and users data
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  const onAddTalk = (text) => {
    // @TODO: dispatch async action to add talk
    dispatch(asyncAddTalk({ text }));
  };

  const onLike = (id) => {
    // @TODO: dispatch async action to toggle like talk
    dispatch(asyncToggleLikeTalk(id));
  };

  // mencari user untuk variabel talksList
  function findTalkListUser(talk, users) {
    const user = users.find((user) => user.id === talk.user);

    // jika variabel user == undefined, tetapi user yang membuat talk tersebut sama dengan user yang login
    // maka kembalikan data user yang login, selain dari itu kembalikan variabel user, apapun isinya
    return (user == undefined && talk.user === authUser.id) ? authUser : user;
  }

  const talkList = talks.map((talk) => ({
    ...talk,
    user: findTalkListUser(talk, users),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}

export default HomePage;
