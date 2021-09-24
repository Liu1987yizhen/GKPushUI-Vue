define(["./when-208fe5b0","./Cartesian2-74eb73ca","./Transforms-8bc971ce","./ComponentDatatype-9204e9f6","./Check-d18af7c4","./GeometryAttribute-9fc79195","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6","./Math-4e53b694","./WallGeometryLibrary-4743b8ab","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./arrayRemoveDuplicates-0f62a181","./PolylinePipeline-3a40ad00","./EllipsoidGeodesic-cdcd09f8","./EllipsoidRhumbLine-64ee3955","./IntersectionTests-b7c42792","./Plane-0f109f34"],function(v,b,C,H,e,A,k,w,G,L,i,t,a,n,r,o,s,l){"use strict";var x=new b.Cartesian3,P=new b.Cartesian3;function d(e){var i=(e=v.defaultValue(e,v.defaultValue.EMPTY_OBJECT)).positions,t=e.maximumHeights,a=e.minimumHeights,n=v.defaultValue(e.granularity,G.CesiumMath.RADIANS_PER_DEGREE),e=v.defaultValue(e.ellipsoid,b.Ellipsoid.WGS84);this._positions=i,this._minimumHeights=a,this._maximumHeights=t,this._granularity=n,this._ellipsoid=b.Ellipsoid.clone(e),this._workerName="createWallOutlineGeometry";i=1+i.length*b.Cartesian3.packedLength+2;v.defined(a)&&(i+=a.length),v.defined(t)&&(i+=t.length),this.packedLength=i+b.Ellipsoid.packedLength+1}d.pack=function(e,i,t){var a;t=v.defaultValue(t,0);var n=e._positions,r=n.length;for(i[t++]=r,a=0;a<r;++a,t+=b.Cartesian3.packedLength)b.Cartesian3.pack(n[a],i,t);var o=e._minimumHeights,r=v.defined(o)?o.length:0;if(i[t++]=r,v.defined(o))for(a=0;a<r;++a)i[t++]=o[a];var s=e._maximumHeights;if(r=v.defined(s)?s.length:0,i[t++]=r,v.defined(s))for(a=0;a<r;++a)i[t++]=s[a];return b.Ellipsoid.pack(e._ellipsoid,i,t),i[t+=b.Ellipsoid.packedLength]=e._granularity,i};var u=b.Ellipsoid.clone(b.Ellipsoid.UNIT_SPHERE),p={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:u,granularity:void 0};return d.unpack=function(e,i,t){i=v.defaultValue(i,0);for(var a,n,r=e[i++],o=new Array(r),s=0;s<r;++s,i+=b.Cartesian3.packedLength)o[s]=b.Cartesian3.unpack(e,i);if(0<(r=e[i++]))for(a=new Array(r),s=0;s<r;++s)a[s]=e[i++];if(0<(r=e[i++]))for(n=new Array(r),s=0;s<r;++s)n[s]=e[i++];var l=b.Ellipsoid.unpack(e,i,u),m=e[i+=b.Ellipsoid.packedLength];return v.defined(t)?(t._positions=o,t._minimumHeights=a,t._maximumHeights=n,t._ellipsoid=b.Ellipsoid.clone(l,t._ellipsoid),t._granularity=m,t):(p.positions=o,p.minimumHeights=a,p.maximumHeights=n,p.granularity=m,new d(p))},d.fromConstantHeights=function(e){var i=(e=v.defaultValue(e,v.defaultValue.EMPTY_OBJECT)).positions,t=e.minimumHeight,a=e.maximumHeight,n=v.defined(t),r=v.defined(a);if(n||r)for(var o=i.length,s=n?new Array(o):void 0,l=r?new Array(o):void 0,m=0;m<o;++m)n&&(s[m]=t),r&&(l[m]=a);return new d({positions:i,maximumHeights:l,minimumHeights:s,ellipsoid:e.ellipsoid})},d.createGeometry=function(e){var i=e._positions,t=e._minimumHeights,a=e._maximumHeights,n=e._granularity,e=e._ellipsoid,t=L.WallGeometryLibrary.computePositions(e,i,a,t,n,!1);if(v.defined(t)){var r=t.bottomPositions,o=t.topPositions,s=o.length,n=2*s,l=new Float64Array(n),m=0;for(s/=3,c=0;c<s;++c){var d=3*c,u=b.Cartesian3.fromArray(o,d,x),d=b.Cartesian3.fromArray(r,d,P);l[m++]=d.x,l[m++]=d.y,l[m++]=d.z,l[m++]=u.x,l[m++]=u.y,l[m++]=u.z}for(var t=new k.GeometryAttributes({position:new A.GeometryAttribute({componentDatatype:H.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:l})}),p=n/3,f=w.IndexDatatype.createTypedArray(p,n=2*p-4+p),h=0,c=0;c<p-2;c+=2){var g=c,y=c+2,_=b.Cartesian3.fromArray(l,3*g,x),E=b.Cartesian3.fromArray(l,3*y,P);b.Cartesian3.equalsEpsilon(_,E,G.CesiumMath.EPSILON10)||(_=c+3,f[h++]=E=c+1,f[h++]=g,f[h++]=E,f[h++]=_,f[h++]=g,f[h++]=y)}return f[h++]=p-2,f[h++]=p-1,new A.Geometry({attributes:t,indices:f,primitiveType:A.PrimitiveType.LINES,boundingSphere:new C.BoundingSphere.fromVertices(l)})}},function(e,i){return(e=v.defined(i)?d.unpack(e,i):e)._ellipsoid=b.Ellipsoid.clone(e._ellipsoid),d.createGeometry(e)}});