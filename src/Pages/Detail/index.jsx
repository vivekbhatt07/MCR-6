import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  ContainedActionBtn,
  IconActionBtn,
  ModalProvider,
  PageContainer,
  ReviewCard,
  TextInputLabel,
  TextInput,
} from "../../Components";
import { useData } from "../../Context/DataContext";

const Detail = () => {
  const { restaurantId } = useParams();
  const { restaurantList, setRestaurantList } = useData();
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const getRestaurant = restaurantList.find((currentRestaurant) => {
    return currentRestaurant.id == restaurantId;
  });

  const [reviewData, setReviewData] = useState({
    reviewRating: "",
    reviewComment: "",
  });

  const reviewDatahandler = (event) => {
    const { name, value } = event.target;
    return setReviewData((prevReviewData) => {
      return { ...prevReviewData, [name]: value };
    });
  };

  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    setRestaurantList((prevRestaurantList) => {
      return prevRestaurantList.map((currentRestaurant) => {
        return currentRestaurant.id == getRestaurant?.id
          ? {
              ...currentRestaurant,
              ratings: [
                ...currentRestaurant.ratings,
                {
                  rating: reviewData.reviewRating,
                  comment: reviewData.reviewComment,
                  revName: "Vivek",
                  pp: "https://res.cloudinary.com/duqsyuriy/image/upload/v1687520455/Avatar/AvatarFifteen_wmdlk9.svg",
                },
              ],
            }
          : currentRestaurant;
      });
    });
    console.log(reviewData);
    setReviewData({
      reviewRating: "",
      reviewComment: "",
    });
    closeReviewModal();
  };

  return (
    <PageContainer className="flex flex-col">
      <IconActionBtn
        handleClick={() => {
          navigate(-1);
        }}
        className="absolute top-[20px] left-[8px]"
      >
        <ArrowBackIcon />
      </IconActionBtn>
      <div className="flex justify-between pb-4 border-b-2 border-stone-400">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl mb-2">{getRestaurant?.name}</h1>
          <p className="text-stone-500 font-normal">
            {getRestaurant?.menu
              .map((currentMenuItem) => {
                return currentMenuItem.name;
              })
              .join(",  ")}
          </p>

          <span className="text-stone-500 font-normal">
            {getRestaurant?.address}
          </span>
          <span className="text-stone-500 font-normal">
            {getRestaurant?.phone}
          </span>
          <p className="text-stone-500 font-normal">
            Average Rating: {getRestaurant?.averageRating}
          </p>
        </div>
        <div className="flex items-center">
          <ModalProvider
            modalTitle="Review"
            isOpen={isReviewModalOpen}
            closeModal={closeReviewModal}
            modalBtnVariant={
              <ContainedActionBtn handleClick={openReviewModal}>
                Add Review
              </ContainedActionBtn>
            }
          >
            <form
              className="flex flex-col p-3 bg-stone-300 gap-4"
              onSubmit={reviewSubmitHandler}
            >
              {/* <TextInputLabel labelText="Name">
                <TextInput
                  className="py-2"
                  name="reviewName"
                  onChange={reviewDatahandler}
                  value={reviewData.reviewName}
                />
              </TextInputLabel> */}
              <TextInputLabel labelText="Rating">
                <select
                  className="py-2"
                  name="reviewRating"
                  onChange={reviewDatahandler}
                  value={reviewData.reviewRating}
                  defaultValue="none"
                >
                  <option value="none">Select Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </TextInputLabel>
              <TextInputLabel labelText="Comment">
                <TextInput
                  inputName="reviewComment"
                  inputType="text"
                  inputPlaceholder="Write Comment"
                  inputHandle={reviewDatahandler}
                  inputValue={reviewData.reviewComment}
                />
              </TextInputLabel>
              <div className="flex gap-2">
                <ContainedActionBtn containBtnType="submit">
                  Submit
                </ContainedActionBtn>
                <ContainedActionBtn
                  containBtnType="button"
                  handleClick={() => {
                    closeReviewModal();
                    setReviewData({
                      reviewRating: "",
                      reviewComment: "",
                    });
                  }}
                >
                  Cancel
                </ContainedActionBtn>
              </div>
            </form>
          </ModalProvider>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-8">
        <h3 className="text-3xl">Reviews</h3>
        <ul className="flex flex-col gap-2">
          {getRestaurant?.ratings.map((currentRating, ratingIndex) => {
            return (
              <li key={ratingIndex}>
                <ReviewCard {...currentRating} />
              </li>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Detail;
