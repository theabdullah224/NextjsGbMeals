/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useId } from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const ShowPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {data:session} = useSession()

 

  useEffect(() => {
    // Only fetch PDFs if session and userId are available
    // @ts-ignore
    if (session?.user?.id) {
      // @ts-ignore
      const userId = session?.user?.id; // Explicitly save the user ID from the session
  
      const fetchPDFs = async () => {
        try {
          const response = await fetch(`/api/user/${userId}/pdfs`);
          const data = await response.json();
  
          if (!response.ok) throw new Error(data.message);
  

          
          setPdfs(data.pdfs);
          // setName(session.user.name || '');
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPDFs();
    }
  }, [session]);
  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mb-4 bg-red-100 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }



  const handleDelete = async (pdfId) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return;
    
    try {
  
      const response = await fetch(`/api/pdfs/${pdfId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      
      // Refresh PDFs list
      // fetchPDFs();
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handlePdfClick = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="flex justify-center p-8 text-Text1">Loading...</div>;
  }

  if (error) {
    return (
      ""
    );
  }
  return (
    <div className="space-y-4  w-full">
    <h2 className="text-3xl font-bold  text-gray-800 mb-4">My Resources </h2>
    
    <ul className="space-y-3 overflow-y-auto max-h-[30rem]  w-full max-w-4xl ">
      {/* ........................................................................ */}
      {pdfs.map((pdf ,index) => (
        
        <li 
          key={index} 
          className="flex flex-col md:flex-row w-full  items-start md:items-center justify-between bg-gray-50 px-3 sm:px-4 py-3 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <FileText className="text-P-Green1 text-xl sm:text-2xl flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-700 text-sm sm:text-base truncate max-w-[8rem] sm:max-w-full">
                Meal Plan & Shopping List
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {new Date(pdf.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex   space-x-2 w-full md:w-auto justify-end mt-2 sm:mt-0">
            <button
            aria-label="viewmealplan"
              onClick={() => handlePdfClick(pdf.mealPlanUrl)}
              className="flex-1 sm:flex-none px-3 py-1 bg-P-Green1 text-white text-sm rounded  transition duration-150 ease-in-out flex items-center justify-center"
            >
              View Meal Plan
            </button>
            <button
            aria-label="viewshoppinglist"
              onClick={() => handlePdfClick(pdf.shoppingListUrl)}
              className="flex-1 sm:flex-none px-3 py-1 bg-P-Green1 text-white text-sm rounded  transition duration-150 ease-in-out flex items-center justify-center"
            >
              View Shopping List
            </button>
            <button
            aria-label="delete"
              onClick={() => handleDelete(pdf.id)}
              className="flex-1 sm:flex-none px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
      
      {pdfs.length === 0 && (
        <li className="text-center py-8 text-gray-500">
          No PDFs found
        </li>
      )}
    </ul>
  </div>
  );
};

export default ShowPdf;
