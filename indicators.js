
/*
	Basic Math functions
*/

	function pow(serie,power){
		return serie.map(function(x) { return Math.pow(x, power); });
	}

	function sqrt(serie){
		 return serie.map(Math.sqrt);
	}
	
	function cbrt(serie){
		 return serie.map(Math.cbrt);
	}
	
	function abs(serie){
		 return serie.map(Math.abs);
	}
	
	function ceil(serie){
		 return serie.map(Math.ceil);
	}
	
	function floor(serie){
		 return serie.map(Math.floor);
	}
	
	function round(serie){
		return serie.map(Math.round);
	}
	
	function trunc(serie){
		return serie.map(Math.trunc);
	}
	
	function hypot(serie){
		 return serie.map(Math.hypot);
	}
	
	function log(serie){
		 return serie.map(Math.log);
	}
	
	function log10(serie){
		 return serie.map(Math.log10);
	}
	
	function sin(serie){
		 return serie.map(Math.sin);
	}
	
	function cos(serie){
		 return serie.map(Math.cos);
	}
	
	function tan(serie){
		 return serie.map(Math.tan);
	}
	
	// tangente inversa en grados
	function tanh(serie){
		 return serie.map(Math.tan);
	}
	
	// genera una serie de valores random de 0 a 1
	function random(size){		
		res = [];
		for (var i=0; i<size;i++)
		  res.push(Math.random());
	  
		return res;
	}
	
	
	// JS tiene mas funciones trigonometricas que se pueden incluir
	
/* 
	Indicators as functions
*/

	// @param data serie 
	// @param bars ago
	// @return data serie
	function barsAgo(serie=CLOSE,n){		
		var res = [];
		
		for (var i=0;i<serie.length-n;i++)
			res.push(serie[i]);
		
		return res;
	}

	// Cuenta el numero de barras en el chart
	function count(){
		return CLOSE.length;
	}
	
	// A collection of historical bar low prices n-bars ago
	// @param bars ago
	// @return data serie of low values
	function low(n){
		return barsAgo(LOW,n);
	}
	
	// A collection of historical bar high prices n-bars ago
	// @param bars ago
	// @return data serie of low values
	function high(n){
		return barsAgo(HIGH,n);
	}
	
	// A collection of historical bar open prices n-bars ago
	// @param bars ago
	// @return data serie of low values
	function open(n){
		return barsAgo(OPEN,n);
	}
	
	// A collection of historical bar close prices n-bars ago
	// @param bars ago
	// @return data serie of low values
	function close(n){
		return barsAgo(CLOSE,n);
	}

	// A collection of historical bar volume prices n-bars ago
	// @param bars ago
	// @return data serie of low values
	function volume(n){
		return barsAgo(VOLUME,n);
	}	
	
	// @param data serie 	
	// @return data serie
	function yesterday(serie=CLOSE){		
		return barsAgo(serie,1);
	}
	
	// alias de yesterday()
	function prev(serie=CLOSE){		
		return barsAgo(serie,1);
	}
	
	// Exponential Movil Average
	// @param data serie de datos de entrada
	// @param periodo
	// @return data serie de resultado
	function ema(serie=CLOSE,n=14){
		var res = [];		
		var k   = 2 / (n + 1);				
		
		function calc_ema(dato,ema_prev){		
			return ((dato * k) + (ema_prev * (1- k)));
		}
		
		// seed
		var calc = avg(copy(serie,0,n));
		res.push(calc);						
								
		for (var i=n; i<serie.length; i++){
			calc = calc_ema(serie[i], calc,k);
			res.push(calc);						
		}	
		
		return res; 
	}		
	
	
	// Simple Movil Average
	// @param data serie de datos de entrada
	// @param periodo
	// @return data serie de resultado
	function sma(serie=CLOSE,n=14){
		var res = [];		
		var acc = 0;
		
		for (var i=0; i<n; i++)
			acc += serie[i];
		
		res.push(acc/n);						
		for (var i=n; i<serie.length; i++){			
			acc += serie[i] - serie[i-n];		
				res.push(acc/n);
		}	
		
		return res; 
	}
	
	// Cumulative sum
	// realiza la suma acumulada de los valores en el periodo especificado
	// @param data serie de datos de entrada
	// @param periodo
	// @return data serie de resultado
	function cum(serie, n){
		var res = [];		
		var acc = 0;
		
		for (var i=0; i<n; i++)
			acc += serie[i];
		
		res.push(acc);						
		for (var i=n; i<serie.length; i++){			
			acc += serie[i] - serie[i-n];		
			res.push(acc);
		}	
		
		return res; 
	}

	// Cumulative product (productoria)	
	function prod(serie, n){
		var res = [];		
		var acc = 1;
		
		for (var i=0; i<n; i++)
			acc *= serie[i];
		
		res.push(acc);						
		for (var i=n; i<serie.length; i++){			
			acc *= serie[i] / serie[i-n];		
			res.push(acc);
		}	
		
		return res; 	
	}
	
	function sumScalar(serie,scalar){
		var res = [];
		
		for (var i=0; i<serie.length; i++)
			res.push(serie[i]+scalar);
		
		return res;		
	}	
	
	function diffScalar(serie,scalar)
	{
		res = [];
		
		for (var i=0; i<serie.length; i++)			
			res.push(serie[i]-scalar);		
			
		return res;	
	}
		
	function mulScalar(serie,scalar){
		var res = [];
		
		for (var i=0; i<serie.length; i++)
			res.push(serie[i]*scalar);
		
		return res;		
	}		
		
	function divScalar(serie,scalar){
		var res = [];
		
		for (var i=0; i<serie.length; i++)
			res.push(serie[i]/scalar);
		
		return res;		
	}			
		
	function sumSeries(serie1,serie2){
		var res = [];		
		var start, end, len;
		
		if (serie1.length > serie2.length){							
			dif =  serie1.length-serie2.length;
			start = dif;
			end = serie1.length;
			
			for (var i=start; i<end; i++){
				res.push(serie1[i]+serie2[i-dif]);
			}		
		
		}else
		{
			dif =  serie2.length-serie1.length;
			start = dif;
			end = serie2.length;					
			
			for (var i=start; i<end; i++){				
				res.push(serie1[i-dif]+serie2[i]);
			}		
			
		}		
		return res;	
	}			
	
	// serie1 - serie2
	function diffSeries(serie1,serie2){
		var res = [];		
		var start, end, len;
		
		if (serie1.length > serie2.length){							
			dif =  serie1.length-serie2.length;
			start = dif;
			end = serie1.length;
			
			for (var i=start; i<end; i++){
				res.push(serie1[i]-serie2[i-dif]);
			}		
		
		}else
		{
			dif =  serie2.length-serie1.length;
			start = dif;
			end = serie2.length;					
			
			for (var i=start; i<end; i++){				
				res.push(serie1[i-dif]-serie2[i]);
			}		
			
		}		
		return res;	
	}	
	
	// serie1*serie2 elemento a elemento
	function mulSeries(serie1,serie2){
		var res = [];		
		var start, end, len;
		
		if (serie1.length > serie2.length){							
			dif =  serie1.length-serie2.length;
			start = dif;
			end = serie1.length;
			
			for (var i=start; i<end; i++){
				res.push(serie1[i]*serie2[i-dif]);
			}		
		
		}else
		{
			dif =  serie2.length-serie1.length;
			start = dif;
			end = serie2.length;					
			
			for (var i=start; i<end; i++){				
				res.push(serie1[i-dif]*serie2[i]);
			}		
			
		}		
		return res;	
	}		
	
	// serie1/serie2 elemento a elemento
	function divSeries(serie1,serie2){
		var res = [];		
		var start, end, len;
		
		if (serie1.length > serie2.length){							
			dif =  serie1.length-serie2.length;
			start = dif;
			end = serie1.length;
			
			for (var i=start; i<end; i++){
				res.push(serie1[i]/serie2[i-dif]);
			}		
		
		}else
		{
			dif =  serie2.length-serie1.length;
			start = dif;
			end = serie2.length;					
			
			for (var i=start; i<end; i++){				
				res.push(serie1[i-dif]/serie2[i]);
			}		
			
		}		
		return res;	
	}		

	
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	// a+b
	function sum(a,b){		
		if (Array.isArray(a) && Array.isArray(b))
			return sumSeries(a,b);
		else	
			if (Array.isArray(a) && isNumber(b))
				return sumScalar(a,b);
			else
				if (isNumber(a) && Array.isArray(b))
					return sumScalar(b,a);
				else
					if (isNumber(a) && isNumber(b))
						return a+b;
					else
						throw "Invalid SUM";
	}
	
	// a-b
	function dif(a,b){		
		if (Array.isArray(a) && Array.isArray(b))
			return diffSeries(a,b);
		else	
			if (Array.isArray(a) && isNumber(b))
				return diffScalar(a,b);
			else				
				if (isNumber(a) && isNumber(b))
						return a-b;
					else
						throw "Invalid DIF";
	}
	
	// a*b
	function mul(a,b){		
		if (Array.isArray(a) && Array.isArray(b))
			return mulSeries(a,b);
		else	
			if (Array.isArray(a) && isNumber(b))
				return mulScalar(a,b);
			else
				if (isNumber(a) && Array.isArray(b))
					return mulScalar(b,a);
				else
					if (isNumber(a) && isNumber(b))
						return a*b;
					else
						throw "Invalid MUL";
	}

	// a/b
	function div(a,b){		
		if (Array.isArray(a) && Array.isArray(b))
			return divSeries(a,b);
		else	
			if (Array.isArray(a) && isNumber(b))
				return divScalar(a,b);
			else				
				if (isNumber(a) && isNumber(b))
						return a/b;
					else
						throw "Invalid DIV";
	}
	
	
		
	// Sumatoria condicional movil
	// @param data serie de datos de entrada
	// @param periodo
	// @param funcion con condicional
	// @return data serie de resultado
	function sumIf(serie,n,conditional){
		var res = [];		
		var acc = 0;
		
		for (var i=0; i<n; i++)
			if (conditional(serie[i]))
				acc += serie[i];
		
		res.push(acc);						
		for (var i=n; i<serie.length; i++){			
		
			if (conditional(serie[i-n]))
				acc -= serie[i-n];			
			
			if (conditional(serie[i]))				
				acc += serie[i];				
							
			res.push(acc);
		}	
		
		return res;	
	}
	
	// Contador condicional movil
	// @param data serie de datos de entrada
	// @param periodo
	// @param funcion con condicional
	// @return data serie de resultado
	function countIf(serie,n,conditional){
		var res = [];		
		var acc = 0;
		
		for (var i=0; i<n; i++)
			if (conditional(serie[i]))
				acc ++;
		
		res.push(acc);					
		for (var i=n; i<serie.length; i++){			
		
			if (conditional(serie[i-n]))
				acc --;			
			
			if (conditional(serie[i]))				
				acc ++;				
							
			res.push(acc);					
		}	
		
		return res;	
	}

	// Cuenta las barras que cumplen la condicion respecto del valor de la barra previa	
	// hace (period-1) comparaciones 
	// @param array serie de datos
	// @param int periodo
	// @param funcion condicional sobre (dato[current bar],dato[previous bar])
	// @param shouldBreak bool si una barra no cumple deja de contar si es true
	function countIfPrev(serie,period,conditional,shouldBreak=false){
		var res = [];
		
		for (var b=period-1;b<serie.length;b++){		
			var cnt = 0;
			for (var i=0;i<period-1;i++){				
				if (conditional(serie[b-i],serie[b-i-1]))
					cnt++;			
				else
					if (shouldBreak)
						break;
			}
			res.push(cnt);
		}			
		return res;
	}		

	// Predicado
	// funcion delegada que devuelve un boolean de acuerdo a si la condicion se cumple o no
	// @param data serie de datos de entrada
	// @param periodo
	// @param funcion con condicional
	// @return data serie de resultado	
	function predicate(serie,conditional,n=1){
		var res = [];		
		var succ;
							
		for (var i=n-1; i<serie.length; i++){					
			res.push (conditional(serie[i]));					
		}	
		
		return res;	
	}
	
	// Minimo movil
	// @param data serie de datos de entrada
	// @param periodo
	// @return data serie de resultado	
	function min(serie,n = serie.length){
		var res = [];
		
		for (var j=0; j<serie.length-n+1;j++)
		{	
			var min =  Number.MAX_VALUE;		
							
			for (var i=j; i<j+n; i++){				
				if (serie[i] < min)
					min = serie[i];
			}
			res.push(min);	
		}	
			
		return res;	
	}	

	function lowest(serie){
		return min(serie);
	}

	// Maximo movil
	// @param data serie de datos de entrada
	// @param periodo
	// @return data serie de resultado	
	function max(serie,n = serie.length){
		var res = [];
		
		for (var j=0; j<serie.length-n+1;j++)
		{	
			var max =  Number.MIN_VALUE;		
							
			for (var i=j; i<j+n; i++){				
				if (serie[i] > max)
					max = serie[i];
			}
			res.push(max);	
		}	
			
		return res;	
	}

	function highest(serie){
		return max(serie);
	}
	
	// MACD --- ok
	// @param data serie
	// @param int fast average
	// @param int slow average
	// @param int smooth
	function macd(serie=CLOSE,n1=12,n2=26,n3=9){
		var res = {Line:[],Signal:[],Histogram:[]};	
		
		var ema26 = ema(serie,n2);
		var ema12 = ema(serie,n1);	
		
		res.Line = diffSeries(ema12,ema26);				
		res.Signal = ema(res.Line, n3); 		
		res.Histogram = diffSeries(res.Line, res.Signal);
		
		return res;
	}	
	
	// ok
	function momemtum(serie=CLOSE,n=14){
		return diffSeries(serie,barsAgo(serie,n));
	}
	
	function roc(serie=CLOSE,n=14){		
		var past = barsAgo(serie,n);	
		return mulScalar(divSeries(diffSeries(serie,past),past),100);
	}
	
	// la mediana entre data series paralelos como HIGH y LOW dando (HIGH+LOW)/2  --ok
	// equivalente a Median en NT si serie1 y serie2 son HIGH y LOW
	function medianSeries(serie1,serie2){		
		return div(sumSeries(serie1,serie2),2);
	}
	
	// Movil Median for a data serie -- ok
	// @author #aminmeyghani & #boctulus
	// equivalente a GetMedian() de NT
	function median(serie=CLOSE,n){
		var res = [];
		
		for (var i=n; i<=serie.length; i++){				
			var subserie = copy(serie,i-n,i);						
			var numbers  = subserie.sort((a,b) => a - b);
			var middle   = Math.floor(numbers.length / 2);
			var isEven   = numbers.length % 2 === 0;
			
			res.push(isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle]);	
		}	
			
		return res;	
	}	


	// stdDev**2 --- ok	
	function variance(serie,n){
		var res = [];
			
		var means = sma(serie,n); 				
		var i=0;
		for (m of means){
			var d      = diffScalar(  copy(serie,i,i+n)  ,m);
			var d2     = mulSeries(d,d);
			var sum_d2 = 0;	
			
			for (var j=0; j<d2.length; j++)
				sum_d2 += d2[j];
			
			res.push(sum_d2/(n-1));
			i++;
		}		
						
		return  res;
	}
	
	// Standar deviation -- ok
	function stdDev(serie,n){
		var res = [];		
		var std2 = variance(serie,n);
		
		for (var i in std2)
			res.push(Math.sqrt(std2[i]));
			
		return res;
	}

	function barsUp(serie=CLOSE,period){
		var res = [];
		
		for (var b=period-1;b<serie.length;b++){		
			var cnt = 0;
			for (var i=0;i<period-1;i++){				
				if (serie[b-i]>serie[b-i-1])
					cnt++;			
				else
					break;
			}
			res.push(cnt);
		}			
		return res;
	}	
	
	// Cantidad de barras consecutivas con valores decrecientes
	// @return int
	function barsDown(serie=CLOSE,period){
		var res = [];
		
		for (var b=period-1;b<serie.length;b++){		
			var cnt = 0;
			for (var i=0;i<period-1;i++){				
				if (serie[b-i]<serie[b-i-1])
					cnt++;			
				else
					break;
			}
			res.push(cnt);
		}			
		return res;
	}
	
	// El numero de barras consecutivas que supera el ultimo valor es mayor o igual a barCount?
	// si barCount no se especifica verifica que en el periodo siempre haya valores crecientes
	// @return boolean
	function nBarsUp(serie=CLOSE,period,barCount=period-1){
		var res = [];
		
		for (var b=period-1;b<serie.length;b++){		
			var cnt = 0;
			for (var i=0;i<period-1;i++){				
				if (serie[b-i]>serie[b-i-1])
					cnt++;			
				else
					break;
			}
			res.push(cnt>=barCount);		
		}			
		return res;		
	}

	// El numero de barras consecutivas que es inferior al ultimo valor es mayor o igual a barCount?
	// si barCount no se especifica verifica que en el periodo siempre haya valores decrecientes
	// @return boolean
	function nBarsDown(serie=CLOSE,period,barCount=period-1){
		var res = [];
		
		for (var b=period-1;b<serie.length;b++){		
			var cnt = 0;
			for (var i=0;i<period-1;i++){
				if (serie[b-i]<serie[b-i-1])
					cnt++;			
				else
					break;
			}
			res.push(cnt>=barCount);				
		}			
		return res;
	}
			
	// Checks for a rising condition which is true when the current value is greater than the previous value
	// --ok
	function rising(serie=CLOSE){
		var res = [];
		for (var i=1;i<serie.length;i++)
			res.push(serie[i]>serie[i-1]);
		
		return res;		
	}
	
	//  otra implementacion  de rising --ok
	function rising2(serie=CLOSE){
		return predicate(diffSeries(serie,prev(serie)),(x)=>{return x>0;},1);
	}
	
	//  otra implementacion  de rising --ok
	function rising3(serie=CLOSE){
		return predicate(countIfPrev(serie,2,function(x1,x0){ return x1>x0 }),(x)=>{return x>0;},1);
	}
	 
	 
	// Checks for a falling condition which is true when the current value is less than the previous value 
	function falling(serie=CLOSE){
		var res = [];
		for (var i=1;i<serie.length;i++)
			res.push(serie[i]<serie[i-1]);
		
		return res;		
	} 
	
	// CrossAbove(IserieSeries series1, IserieSeries series2, int lookBackPeriod)	
	function crossAbove(serie1,serie2,n){
		var res = [];
		var succ;
		
		if (serie1.length<serie2.length)
			serie2 = trimmer(serie2,serie1.length);
		
		if (serie2.length<serie1.length)
			serie1 = trimmer(serie1,serie2.length);
				
		for (var i=n-1;i<serie1.length;i++){
			succ = true;
			for (var j=1;j<n;j++){
				if (serie1[i-j] < serie2[i-j])
					continue;
				else{		
					succ  = false;
					break;	
				}
			}	
			
			res.push (succ && (serie1[i] > serie2[i]));			
		}

		return res;
	}
	
	// aparentemente ok (dificil de verificar exaustivamente)
	function crossBelow(serie1,serie2,n){
		var res = [];
		var succ;
		
		if (serie1.length<serie2.length)
			serie2 = trimmer(serie2,serie1.length);
		
		if (serie2.length<serie1.length)
			serie1 = trimmer(serie1,serie2.length);
				
		for (var i=n-1;i<serie1.length;i++){
			succ = true;
			for (var j=1;j<n;j++){
				if (serie1[i-j] > serie2[i-j])
					continue;
				else{		
					succ  = false;
					break;	
				}
			}	
			
			res.push (succ && (serie1[i] < serie2[i]));			
		}

		return res;
	}
	
	// Cross above some value -- ok
	// retorna true cuando se produce un cruce hacia arriba en la ultima barra
	// Si hubo un valor superior en en periodo considerado (cruce previo) se invalida => false
	function exceed(serie,value,n){						
		var res = [];	
		
		for (var i=n-1;i<serie.length;i++)
		{
			var subarr = copy(serie,i-n+1,i);			
			res.push ((countIf(subarr,subarr.length, function(x){ return (x<value); }) == subarr.length) && (serie[i]>value));
		}	
		
		return res;
	}
	
	// Cross below some value --ok
	function fallBelow(serie,value,n){
		var res = [];	
		
		for (var i=n-1;i<serie.length;i++)
		{
			var subarr = copy(serie,i-n+1,i);			
			res.push ((countIf(subarr,subarr.length, function(x){ return (x>value); }) == subarr.length) && (serie[i]<value));
		}	
		
		return res;
	}
	
	// serie1 cruza hacia arriba a serie2 o constante?
	// si quiero saber si el cruce es hacia abajo, invierto el orden de los argumentos
	function cross(a,b,n){
		if (Array.isArray(a) && Array.isArray(b))
			return crossAbove(a,b,n);
		else
			if (Array.isArray(a) && isNumber(b))
				return exceed(a,b,n);
			else
				throw "Argument Exception in CROSS function";
	}	
	
	// Slope(IserieSeries series, int startBarsAgo, int endBarsAgo)	--ok
	function slope(serie,startBarsAgo,endBarsAgo){
		var dx = startBarsAgo - endBarsAgo;
		var dy = diffSeries(barsAgo(serie,endBarsAgo), barsAgo(serie,startBarsAgo));
				
		return div(dy,dx);
	}
	
	// Returns the number of bars ago the highest price value occurred for the lookback period. 		
	// Colorario: retorna 0 si la ultima barra tiene el valor mas alto
	function highestBar(serie=CLOSE,n){		
		var res = [];
		
		for (var i=n-1;i<serie.length;i++){
			var mx = max(copy(serie,i-n+1,i))[0];		
			
			if (serie[i]>=mx)
				res.push(0);				
			else
				for (var j=1;j<n;j++){
					if (serie[i-j] == mx){
						res.push(j);
						break;
					}		
				}	
		}	
			
		return 	res;
	}

	
	// Returns the number of bars ago the lowest price value occured for the lookback period. 	
	function lowestBar(serie=CLOSE,n){		
		var res = [];
		
		for (var i=n-1;i<serie.length;i++){
			var mm = min(copy(serie,i-n+1,i))[0];		
			
			if (serie[i]<=mm)
				res.push(0);				
			else
				for (var j=1;j<n;j++){
					if (serie[i-j] == mm){
						res.push(j);
						break;
					}		
				}	
		}	
			
		return 	res;
	}

	
	// precio ponderado
	function weighted(n){
		var res = [];
		
		for (var i=n-1;i<CLOSE.length;i++)
			res.push((HIGH[i] + LOW[i] + CLOSE[i] + CLOSE[i]) / 4);
				
		return res;
	}
	
	// precio tipico
	function typical(n){
		var res = [];
		
		for (var i=n-1;i<CLOSE.length;i++)
			res.push((HIGH[i] + LOW[i] + CLOSE[i]) / 3);
				
		return res;
	}
		
	// Double Exponential Moving Average --ok
	// DEMA needs 3 * period - 2 samples to start producing values
	function dema(serie=CLOSE,n=14){		
		return diffSeries( mulScalar(ema(serie, n),2) ,  ema(ema(serie, n), n));
	}
	
	// Triple Exponential Moving Average
	function tema(serie=CLOSE,n=14){		
		return diffSeries( mulScalar(ema(serie, n),3) ,  ema(ema(ema(serie,n),n),n));
	}
	
	// Triple Exponential (TRIX)
	// implementado igual que en NJ7
	function trix(serie=CLOSE,period=14,signalPeriod=3){
		var tripleEma = ema(ema(ema(serie, period), period), period);
		var tx = 100 * ( diff(tripleEma,yesterday(tripleEma)) / tripleEma);
		
		return {trix: tx, signal: (ema(tx, signalPeriod)) }
	}
	
	// Triangular (TMA)
	function tma(serie=CLOSE,n=14){
		if ((n % 2) == 0) 
		{			
			p1 = n / 2;
			p2 = p1 + 1;
		} 
		else 
		{		
			p1 = (n + 1) / 2;
			p2 = p1;
		}
		
		return (sma(sma(serie, p1), p2));
	}
		
	
	function stdError(serie,n=14){
		return div(stdDev(serie,n),Math.sqrt(n));
	}
	
		
	// Bollinger bands
	function bollinger(serie=CLOSE,n=14,numStdDev=2){		
		var smaValue    = sma(n);
		var stdDevValue = stdDev(n);
						
        var upper  = (smaValue + NumStdDev * stdDevValue);
        var middle = (smaValue);
        var lower  = (smaValue - NumStdDev * stdDevValue);
				
		return {upper: upper, middle: middle, lower: lower};
	}
	

	
	// Accumulation Distribution Line	
	function adl(){
		var ad = [0];
		
		var money_flow = divSeries(diffSeries(diffSeries(CLOSE,LOW),diffSeries(HIGH,CLOSE)),diffSeries(HIGH,LOW));
		var money_flow_vol = mulSeries(money_flow,VOLUME);
		
		for (var i=1;i<CLOSE.length;i++)
			ad.push(ad[i-1]+money_flow_vol[i]);
		
		return ad;	
	}
	
	
	// Retorna un array de gaps	
	function gapDown(){
		var res=[];
				
		for (var i=1;i<count();i++){
			res.push(HIGH[i]<LOW[i-1]);
		}
		
		return res;		
	}
	
	function gapUp(){
		var res=[];
				
		for (var i=1;i<count();i++){
			res.push(HIGH[i]>LOW[i-1]);
		}
		
		return res;		
	}
	
	// Inside Day
	function inside(){
		var res=[];
				
		for (var i=1;i<count();i++){
			res.push(HIGH[i]<HIGH[i-1] &&  LOW[i]>LOW[i-1]);
		}
		
		return res;		
	}
	
	// Outside Day
	function outside(){
		var res=[];
				
		for (var i=1;i<count();i++){
			res.push(HIGH[i]>HIGH[i-1] &&  LOW[i]<LOW[i-1]);
		}
		
		return res;		
	}
	
	function range(){
		return diff(HIGH,LOW);
	}	

	// immediate IF function -- ok
	// retorna valores de la serie1 o de la serie2 segun sea true/false en la serie de condiciones	
	function iif(serie_conditions,serie1,serie2){
		var res=[];
				
		for (var i=0;i<serie_conditions.length;i++)			
			res.push(serie_conditions[i] ? serie1[i] : serie2[i] );		
		
		return res;
	}
	
	// %K = 100(C - L14)/(H14 - L14)
	// %D = 3-period moving average of %K
	function stochasticsFast(serie,periodK = 14, periodD = 3){
		var res = {};
		var res = {};
		
		res.K = mulScalar(100, div(diff(CLOSE,low(periodK)),diff(high(periodK),low(periodK))) );
		res.D = sma(K,periodD);
	
		return res;
	}
	
		
	// Williams %R'
	// %R = (HIGHest HIGH – Closing Price) / (HIGHest HIGH – LOWest LOW) x -100
	// ojo: NJ lo define ligeramente distinto
	function williamsR(n=14){
		var highestHIGH  = max(HIGH,n);
		var lowestLOW  = min(LOW,n);		
		return mulScalar (-100, divSeries( diffSeries(highestHIGH,barsAgo(CLOSE,n)), diffSeries(highestHIGH, lowestLOW ) ) );
	}
		
	
	
	// export for testing
	
	if (typeof module != 'undefined'){

		module.exports = {
			
		  sqrt:sqrt,  
		  pow:pow,
		  cbrt:cbrt,
		  abs:abs,
		  ceil:ceil,
		  floor:floor,
		  round:round,	  
		  trunc:trunc,
		  // ...
		  mulScalar:mulScalar,
		  
		  barsAgo:barsAgo,
		  iif:iif
		
		  
		};
		
	}