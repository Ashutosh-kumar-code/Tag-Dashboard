import React from 'react';

const Card = ({ title, subtitle, description, image, actions = [] }) => {
    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col p-4 space-y-4">
            <div className=' flex gap-4 justify-between'>
                {/* Image Section */}
                <div>
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="rounded-full w-12 object-cover"
                        />
                    )}
                </div>
                {/* Title and Subtitle */}
                <div>
                    {title && (
                        <h3 className="text-lg font-semibold  text-gray-800">{title}</h3>
                    )}
                    {subtitle && (
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-gray-600">{description}</p>
                    )}
                    {/* Actions */}
                </div>
                <div>
                        {actions.length > 0 && (
                            <div className="flex space-x-2">
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className={`text-sm rounded ${action.className}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}

                            </div>
                        )}
                    </div>
            </div>

        </div>
    );
};

export default Card;
