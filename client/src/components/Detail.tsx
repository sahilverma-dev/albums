import { useState } from "react";
import { Picture } from "../constants/interfaces";
import Modal from "./Modal";
import Customize from "./Customize";
import Complete from "./Completed";
import Review from "./Review";

type Props = {
  picture: Picture;
  onClose: () => void;
};

type Step = "customize" | "review" | "complete";

const Details = ({ onClose, picture }: Props) => {
  const [step, setStep] = useState<Step>("customize");

  return (
    <Modal onClose={onClose}>
      {step === "customize" && (
        <Customize picture={picture} onComplete={() => setStep("review")} />
      )}
      {step === "review" && <Review onComplete={() => setStep("complete")} />}
      {step === "complete" && <Complete onComplete={onClose} />}
    </Modal>
  );
};

export default Details;
