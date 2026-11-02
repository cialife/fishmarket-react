type StarsProps = {
    rating: number;
  };
  
  export default function Stars({ rating }: StarsProps) {
    return (
      <div className="stars mb-4">
        {[1, 2, 3, 4, 5].map((n) => {
          let icon = "fa-regular fa-star";
          if (rating >= n) icon = "fa-solid fa-star";
          else if (rating >= n - 0.5) icon = "fa-solid fa-star-half-stroke";
          return <i key={n} className={icon}></i>;
        })}
      </div>
    );
  }