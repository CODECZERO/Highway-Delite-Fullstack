import { Link } from 'react-router-dom';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {experience.title}
            </h3>
            <p className="text-sm text-gray-600">{experience.location}</p>
          </div>
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded ml-2 whitespace-nowrap">
            {experience.location.split(',').pop()?.trim()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">From </span>
            <span className="text-base font-bold text-gray-900">₹{experience.basePrice}</span>
          </div>
          <Link
            to={`/experience/${experience._id}`}
            className="bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-gray-900 text-sm font-medium px-4 py-2 rounded transition-all duration-150 active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
