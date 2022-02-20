import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import GoalForm from '../components/GoalForm';
import { fetchGoals, reset } from '../features/goal/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goal
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(fetchGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals && goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You dont have any goals</h3>
        )}
      </section>
    </Fragment>
  );
}

export default Dashboard;
