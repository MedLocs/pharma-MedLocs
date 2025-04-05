
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileUp, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

type ImportType = 'prescriptions' | 'inventory' | 'customers';

interface ImportDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importType: ImportType;
}

export function ImportDataModal({ open, onOpenChange, importType }: ImportDataModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('csv');
  const [file, setFile] = useState<File | null>(null);
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const typeLabels: Record<ImportType, string> = {
    prescriptions: 'Ordonnances',
    inventory: 'Inventaire',
    customers: 'Clients'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setUploadComplete(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
      setUploadComplete(false);
    }
  };

  const parseCSV = (csvFile: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        delimiter: delimiter,
        header: hasHeader,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const parseExcel = (excelFile: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: hasHeader ? 1 : undefined });
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(excelFile);
    });
  };

  const simulateUpload = () => {
    let progressValue = 0;
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(interval);
        setUploadComplete(true);
        setIsUploading(false);
      }
    }, 200);
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à importer.",
        variant: "destructive"
      });
      return;
    }

    try {
      simulateUpload();

      let data: any[] = [];
      
      if (activeTab === 'csv') {
        data = await parseCSV(file);
      } else {
        data = await parseExcel(file);
      }

      console.log(`Données importées pour ${typeLabels[importType]}:`, data);

      // Simuler un court délai pour montrer la progression complète
      setTimeout(() => {
        toast({
          title: "Import réussi",
          description: `${data.length} entrées ont été importées pour ${typeLabels[importType].toLowerCase()}.`,
        });
        
        // Fermer la modale après un court délai
        setTimeout(() => {
          onOpenChange(false);
          setFile(null);
          setUploadComplete(false);
        }, 1000);
      }, 500);
      
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast({
        title: "Erreur d'importation",
        description: "Une erreur s'est produite lors de l'importation du fichier.",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importer des {typeLabels[importType].toLowerCase()}</DialogTitle>
          <DialogDescription>
            Importez vos données depuis un fichier CSV ou Excel.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="csv" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="csv">Fichier CSV</TabsTrigger>
            <TabsTrigger value="excel">Fichier Excel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delimiter">Délimiteur</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter">
                  <SelectValue placeholder="Sélectionner un délimiteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Virgule (,)</SelectItem>
                  <SelectItem value=";">Point-virgule (;)</SelectItem>
                  <SelectItem value="\t">Tabulation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasHeader-csv"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="hasHeader-csv">Le fichier contient une ligne d'en-tête</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="excel" className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasHeader-excel"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="hasHeader-excel">Le fichier contient une ligne d'en-tête</Label>
            </div>
          </TabsContent>
        </Tabs>

        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={activeTab === 'csv' ? '.csv' : '.xlsx,.xls'}
            className="hidden"
          />
          
          {file ? (
            <div className="space-y-2">
              {uploadComplete ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Fichier prêt pour l'import
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="font-medium">Glisser-déposer votre fichier ici ou cliquez pour parcourir</p>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'csv' ? 'Supports CSV' : 'Supports Excel (.xlsx, .xls)'}
              </p>
            </div>
          )}
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Importation en cours...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!file || isUploading}
          >
            Importer les données
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
