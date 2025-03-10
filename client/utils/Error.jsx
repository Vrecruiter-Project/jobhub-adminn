import { SVG } from './notFound';
import './Shimmer.css'
import DataNotFound from './dataNotFound.svg'
export const OffLine = () => {
	return (
		<>
			<div className='Container'>
				<SVG />
				<h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-sans leading-16 errorTier">
					Check your <span className="text-red-500">INTERNET_CONNECTION</span>
					<br />
					To continue with <span className="bg-[#62fcaf] p-2 rounded-md text-[#35374f] font-semibold">JOB HUB</span>
				</h2>

			</div>

		</>
	)
};

export const NotFound = () => {
    return (
        <>
            {/* <h1 className='text-6xl font-bold'>ꃋᴖꃋ</h1>
            <br />
            <h2 className='text-5xl italic text-green-500'>Result Not Found</h2> */}
            <img className='notFoundImg' src={DataNotFound} alt="NotFound" />
        </>
    )
};