<template>
	<div class="container-home">
		<div>
			<b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
				<template slot="header">Edu2GO</template>

				<template slot="lead">
				Plataforma de cursos On-Line
				</template>

				<hr class="my-4">

				<p><i>"A essência do conhecimento consiste em aplicá-lo, uma vez possuído."</i></p>
				
			</b-jumbotron>
		</div>

		<b-container fluid class="p-4 bg-dark">
			<b-row>
				<b-col>
				<b-img thumbnail fluid src="img/curso01.jpg" heigth="100px" alt="Image 1"></b-img>
				
				</b-col>
				<b-col>
				<b-img thumbnail fluid src="img/curso02.png" heigth="100px" alt="Image 2"></b-img>
				</b-col>

				<b-col>
				<b-img thumbnail fluid src="img/curso03.jpg" alt="Image 3"></b-img>
				</b-col>
			</b-row>
		</b-container>
	</div>
	
</template>

<style>
.container-home{
  text-align: center;
}
</style>