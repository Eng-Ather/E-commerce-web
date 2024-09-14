function CategoryChip({ category, isChosen, onClick }) {
    const { name } = category;
    return (
      <div
        onClick={onClick}
        className={`${
          isChosen ? "bg-orange-600 text-white" : "bg-white text-black"
        } m-1 cursor-pointer hover:bg-orange-400  hover:text-white
           border-orange-400 border py-1 px-3 rounded-md`}
      >
        <b>{name}</b>
      </div>
    );
  }
  
  export default CategoryChip;