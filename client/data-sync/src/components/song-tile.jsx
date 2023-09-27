const SongTile = ({ name, onClick, isPlayed }) => {
  return (
    <svg
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='300'
      height='200'
      viewBox='0 0 300 200'
    >
      <rect
        x='0'
        y='0'
        width='300'
        height='200'
        rx='10'
        ry='10'
        fill={isPlayed ? '#AF4F' :'#ffffff'}
        stroke='#000000'
      />
      <text
        x='150'
        y='100'
        textAnchor='middle'
        alignmentBaseline='middle'
        fontSize='24'
      >
        {name}
      </text>
    </svg>
  );
};

export default SongTile;
